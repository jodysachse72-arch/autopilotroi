import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/* ═══════════════════════════════════════════════════════════════
   CMS MIGRATION API — Creates cms_content + cms_revisions tables
   POST /api/admin/migrate-cms
   
   Run once to set up the database schema. Safe to re-run
   (uses IF NOT EXISTS). Requires service role key.
   ═══════════════════════════════════════════════════════════════ */

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    db: { schema: 'public' },
  })

  const queries = [
    // Create content table
    `CREATE TABLE IF NOT EXISTS cms_content (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content_type TEXT NOT NULL,
      page_key TEXT,
      slug TEXT,
      data JSONB NOT NULL DEFAULT '{}',
      sort_order INT DEFAULT 0,
      is_published BOOLEAN DEFAULT true,
      is_featured BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      updated_by TEXT
    )`,
    // Create revisions table
    `CREATE TABLE IF NOT EXISTS cms_revisions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content_id UUID REFERENCES cms_content(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      previous_data JSONB,
      changed_by TEXT,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    )`,
  ]

  const results: { query: string; success: boolean; error?: string }[] = []

  for (const sql of queries) {
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).maybeSingle()
    if (error) {
      // Try direct approach if rpc doesn't exist
      const { error: err2 } = await supabase.from('cms_content').select('id').limit(1)
      if (err2?.code === '42P01') {
        // Table doesn't exist — we need to use the SQL editor
        results.push({ query: sql.substring(0, 60), success: false, error: 'Table does not exist. Run migration in Supabase SQL Editor.' })
      } else if (!err2) {
        results.push({ query: sql.substring(0, 60), success: true, error: 'Table already exists' })
      } else {
        results.push({ query: sql.substring(0, 60), success: false, error: err2.message })
      }
    } else {
      results.push({ query: sql.substring(0, 60), success: true })
    }
  }

  // Test if tables exist by querying them
  const { error: testErr } = await supabase.from('cms_content').select('id').limit(1)
  const tablesExist = !testErr || testErr.code !== '42P01'

  return NextResponse.json({
    tablesExist,
    results,
    message: tablesExist
      ? 'CMS tables are ready! Content Editor can sync with Supabase.'
      : 'Tables not found. Please run the migration SQL in your Supabase Dashboard → SQL Editor.',
    migrationFile: 'supabase/migrations/20260413_cms_content.sql',
  })
}
