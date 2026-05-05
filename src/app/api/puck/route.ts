/**
 * Puck Data API — Save and load page content
 *
 * GET  /api/puck?path=/           → load page data for path
 * POST /api/puck { path, data }   → save page data for path
 *
 * For now, stores data as JSON files in a local `puck-data/` directory.
 * This can be migrated to Supabase later for production use.
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const DATA_DIR = join(process.cwd(), 'puck-data')

function pathToFilename(pagePath: string): string {
  // "/" → "index.json", "/pricing" → "pricing.json", "/about/team" → "about--team.json"
  if (pagePath === '/') return 'index.json'
  return pagePath.replace(/^\//, '').replace(/\//g, '--') + '.json'
}

export async function GET(request: NextRequest) {
  const pagePath = request.nextUrl.searchParams.get('path') || '/'
  const filename = pathToFilename(pagePath)
  const filePath = join(DATA_DIR, filename)

  if (!existsSync(filePath)) {
    return NextResponse.json(null, { status: 404 })
  }

  try {
    const raw = await readFile(filePath, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path: pagePath, data } = body

    if (!pagePath || !data) {
      return NextResponse.json({ error: 'Missing path or data' }, { status: 400 })
    }

    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    const filename = pathToFilename(pagePath)
    const filePath = join(DATA_DIR, filename)

    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ ok: true, path: pagePath })
  } catch (err) {
    console.error('Puck save error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
