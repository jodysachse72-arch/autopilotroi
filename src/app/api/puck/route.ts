/**
 * Puck Data API — Save, load, list and delete page content via Supabase
 *
 * ── Read Operations ──
 * GET  /api/puck?path=/                → load published page data
 * GET  /api/puck?path=/&draft=true     → load draft data (for editor resume)
 * GET  /api/puck?path=/&preview=true   → load draft (or published) for preview
 * GET  /api/puck?list=true             → list all saved pages
 * GET  /api/puck?path=/&revisions=true → list revision history for a page
 *
 * ── Write Operations (require x-puck-write-secret) ──
 * POST /api/puck { path, data }                → PUBLISH (saves to data, clears draft, snapshots revision)
 * POST /api/puck?draft=true { path, data }     → SAVE DRAFT (saves to draft_data only, no publish)
 * POST /api/puck?restore=<revisionId> { path } → RESTORE revision (copies revision data to published data)
 * DELETE /api/puck?path=/about                  → delete a saved page
 *
 * WRITE PROTECTION
 * POST and DELETE require the request header:
 *   x-puck-write-secret: <value of PUCK_WRITE_SECRET env var>
 *
 * NOTE: This is TEMPORARY stabilization protection.
 * Replace with Supabase session/role auth during the auth hardening sprint.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ── Max revisions to keep per page ──────────────────────────────────────────
const MAX_REVISIONS_PER_PAGE = 20

// ── Temporary write protection guard ────────────────────────────────────────
function requireWriteSecret(request: NextRequest): NextResponse | null {
  const secret = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET

  if (!secret) {
    console.error('[Puck API] NEXT_PUBLIC_PUCK_WRITE_SECRET is not set. Refusing write operation.')
    return NextResponse.json(
      { error: 'Server misconfiguration: NEXT_PUBLIC_PUCK_WRITE_SECRET is not set.' },
      { status: 500 }
    )
  }

  const header = request.headers.get('x-puck-write-secret')
  if (!header || header !== secret) {
    return NextResponse.json(
      { error: 'Unauthorized: missing or incorrect x-puck-write-secret header.' },
      { status: 401 }
    )
  }

  return null
}

// Read client — uses anon key (RLS allows public reads)
function getReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

// Write client — uses service_role key (bypasses RLS)
function getWriteClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || (!serviceKey && !anonKey)) throw new Error('Missing Supabase env vars')
  return createClient(url, serviceKey || anonKey!, {
    auth: { persistSession: false },
  })
}

export async function GET(request: NextRequest) {
  const listAll = request.nextUrl.searchParams.get('list')
  const pagePath = request.nextUrl.searchParams.get('path') || '/'
  const wantDraft = request.nextUrl.searchParams.get('draft') === 'true'
  const wantPreview = request.nextUrl.searchParams.get('preview') === 'true'
  const wantRevisions = request.nextUrl.searchParams.get('revisions') === 'true'

  try {
    const supabase = getReadClient()

    // ── List all pages ──
    if (listAll === 'true') {
      const { data, error } = await supabase
        .from('puck_pages')
        .select('path, updated_at, draft_data')
        .order('path', { ascending: true })

      if (error) {
        console.error('[Puck API] List error:', error)
        return NextResponse.json([], { status: 200 })
      }

      const STATIC_PAGES = [
        '/', '/products', '/calculator', '/faqs', '/contact',
        '/signup', '/start', '/privacy', '/terms', '/disclaimer',
      ]

      const savedPaths = new Set((data || []).map((d: { path: string }) => d.path))
      const pages = STATIC_PAGES.map((p) => {
        const row = data?.find((d: { path: string }) => d.path === p)
        return {
          path: p,
          saved: savedPaths.has(p),
          updated_at: row?.updated_at || null,
          has_draft: row?.draft_data != null,
        }
      })

      for (const d of data || []) {
        if (!STATIC_PAGES.includes(d.path)) {
          pages.push({
            path: d.path,
            saved: true,
            updated_at: d.updated_at || null,
            has_draft: d.draft_data != null,
          })
        }
      }

      return NextResponse.json(pages)
    }

    // ── List revisions for a page ──
    if (wantRevisions) {
      const { data, error } = await supabase
        .from('puck_page_revisions')
        .select('id, published_at, label')
        .eq('page_path', pagePath)
        .order('published_at', { ascending: false })
        .limit(MAX_REVISIONS_PER_PAGE)

      if (error) {
        console.error('[Puck API] Revisions list error:', error)
        return NextResponse.json([], { status: 200 })
      }

      return NextResponse.json(data || [])
    }

    // ── Load single page ──
    if (wantDraft || wantPreview) {
      // Draft/Preview: return draft_data if available, else published data
      const { data, error } = await supabase
        .from('puck_pages')
        .select('data, draft_data')
        .eq('path', pagePath)
        .single()

      if (error || !data) {
        return NextResponse.json(null, { status: 404 })
      }

      const responseData = data.draft_data || data.data
      const headers: Record<string, string> = {}
      if (wantPreview) {
        headers['X-Robots-Tag'] = 'noindex, nofollow'
      }

      return NextResponse.json(
        { data: responseData, isDraft: data.draft_data != null },
        { status: 200, headers }
      )
    }

    // Standard published data load
    const { data, error } = await supabase
      .from('puck_pages')
      .select('data, draft_data')
      .eq('path', pagePath)
      .single()

    if (error || !data) {
      return NextResponse.json(null, { status: 404 })
    }

    // Return published data + draft existence flag
    return NextResponse.json({
      ...data.data,
      _hasDraft: data.draft_data != null,
    })
  } catch (err) {
    console.error('[Puck API GET] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = requireWriteSecret(request)
  if (authError) return authError

  const isDraftSave = request.nextUrl.searchParams.get('draft') === 'true'
  const restoreId = request.nextUrl.searchParams.get('restore')

  try {
    const body = await request.json()
    const { path: pagePath, data } = body
    const supabase = getWriteClient()

    // ── Restore a revision ──
    if (restoreId) {
      if (!pagePath) {
        return NextResponse.json({ error: 'Missing path' }, { status: 400 })
      }

      // Fetch the revision
      const { data: revision, error: revError } = await supabase
        .from('puck_page_revisions')
        .select('data')
        .eq('id', restoreId)
        .eq('page_path', pagePath)
        .single()

      if (revError || !revision) {
        return NextResponse.json({ error: 'Revision not found' }, { status: 404 })
      }

      // Snapshot current state before restoring (so restore is itself reversible)
      const { data: currentPage } = await supabase
        .from('puck_pages')
        .select('data')
        .eq('path', pagePath)
        .single()

      if (currentPage?.data) {
        await supabase.from('puck_page_revisions').insert({
          page_path: pagePath,
          data: currentPage.data,
          label: 'Auto-saved before restore',
        })
      }

      // Write the restored data as published + clear draft
      const { error } = await supabase
        .from('puck_pages')
        .update({
          data: revision.data,
          draft_data: null,
          updated_at: new Date().toISOString(),
        })
        .eq('path', pagePath)

      if (error) {
        console.error('[Puck API] Restore error:', error)
        return NextResponse.json({ error: 'Failed to restore' }, { status: 500 })
      }

      return NextResponse.json({ ok: true, path: pagePath, restored: true })
    }

    // ── Draft save (autosave) ──
    if (isDraftSave) {
      if (!pagePath || !data) {
        return NextResponse.json({ error: 'Missing path or data' }, { status: 400 })
      }

      const { error } = await supabase
        .from('puck_pages')
        .update({ draft_data: data })
        .eq('path', pagePath)

      if (error) {
        // If page doesn't exist yet, create it with draft_data
        const { error: insertError } = await supabase
          .from('puck_pages')
          .upsert(
            {
              path: pagePath,
              data: { content: [], root: { props: { title: '' } } },
              draft_data: data,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'path' }
          )

        if (insertError) {
          console.error('[Puck API] Draft save error:', insertError)
          return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 })
        }
      }

      return NextResponse.json({ ok: true, path: pagePath, draft: true })
    }

    // ── Publish ──
    if (!pagePath || !data) {
      return NextResponse.json({ error: 'Missing path or data' }, { status: 400 })
    }

    // 1. Snapshot current published data as a revision BEFORE overwriting
    const { data: currentPage } = await supabase
      .from('puck_pages')
      .select('data')
      .eq('path', pagePath)
      .single()

    if (currentPage?.data && currentPage.data.content && currentPage.data.content.length > 0) {
      const label = `Published ${new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true,
      })}`

      await supabase.from('puck_page_revisions').insert({
        page_path: pagePath,
        data: currentPage.data,
        label,
      })

      // 2. Prune old revisions (keep only newest MAX_REVISIONS_PER_PAGE)
      const { data: allRevisions } = await supabase
        .from('puck_page_revisions')
        .select('id')
        .eq('page_path', pagePath)
        .order('published_at', { ascending: false })

      if (allRevisions && allRevisions.length > MAX_REVISIONS_PER_PAGE) {
        const idsToDelete = allRevisions.slice(MAX_REVISIONS_PER_PAGE).map((r) => r.id)
        await supabase
          .from('puck_page_revisions')
          .delete()
          .in('id', idsToDelete)
      }
    }

    // 3. Write published data + clear draft
    const { error } = await supabase
      .from('puck_pages')
      .upsert(
        {
          path: pagePath,
          data,
          draft_data: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'path' }
      )

    if (error) {
      console.error('[Puck API POST] Save error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, path: pagePath })
  } catch (err) {
    console.error('[Puck API POST] Error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireWriteSecret(request)
  if (authError) return authError

  try {
    const pagePath = request.nextUrl.searchParams.get('path')
    if (!pagePath) {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 })
    }

    const supabase = getWriteClient()
    const { error } = await supabase
      .from('puck_pages')
      .delete()
      .eq('path', pagePath)

    if (error) {
      console.error('[Puck API DELETE] Error:', error)
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, path: pagePath })
  } catch (err) {
    console.error('[Puck API DELETE] Error:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
