#!/usr/bin/env node
/**
 * puck-backup.js
 *
 * Exports ALL rows from the Supabase `puck_pages` table to a timestamped
 * JSON file under backups/puck/.
 *
 * Usage:
 *   node scripts/puck-backup.js
 *
 * Reads from .env.local automatically (no dotenv required — uses inline parser).
 * Requires: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Output: backups/puck/puck-backup-YYYY-MM-DD-HHMM.json
 */

const fs   = require('fs')
const path = require('path')
const https = require('https')

// ── Minimal .env.local parser ─────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env.local not found at', envPath)
    process.exit(1)
  }
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  const env = {}
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    env[key] = val
  }
  return env
}

// ── Minimal fetch over https (no node-fetch dependency) ───────────────────────
function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'GET', headers }, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }) }
        catch (e) { resolve({ status: res.statusCode, body: data }) }
      })
    })
    req.on('error', reject)
    req.end()
  })
}

// ── Timestamp helper ──────────────────────────────────────────────────────────
function timestamp() {
  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
  ].join('')
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const env = loadEnv()
  const supabaseUrl  = env['NEXT_PUBLIC_SUPABASE_URL']
  const supabaseAnon = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']

  if (!supabaseUrl || !supabaseAnon) {
    console.error('ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
    process.exit(1)
  }

  console.log('Connecting to Supabase...')
  console.log('Project:', supabaseUrl.replace('https://', '').split('.')[0])

  // Fetch all rows including full data column
  const apiUrl = `${supabaseUrl}/rest/v1/puck_pages?select=path,data,created_at,updated_at&order=path.asc`
  const { status, body } = await httpsGet(apiUrl, {
    'apikey':        supabaseAnon,
    'Authorization': `Bearer ${supabaseAnon}`,
    'Content-Type':  'application/json',
  })

  if (status !== 200) {
    console.error('ERROR: Supabase returned', status, JSON.stringify(body))
    process.exit(1)
  }

  if (!Array.isArray(body)) {
    console.error('ERROR: Unexpected response shape:', typeof body)
    process.exit(1)
  }

  const rows = body
  console.log(`Found ${rows.length} page(s):`, rows.map(r => r.path).join(', '))

  // Build backup document
  const backup = {
    _meta: {
      tool:        'puck-backup.js',
      version:     '1.0.0',
      created_at:  new Date().toISOString(),
      row_count:   rows.length,
      supabase_project: supabaseUrl.replace('https://', '').split('.')[0],
    },
    pages: rows,
  }

  // Write to file
  const outDir  = path.join(__dirname, '..', 'backups', 'puck')
  fs.mkdirSync(outDir, { recursive: true })

  const filename = `puck-backup-${timestamp()}.json`
  const outPath  = path.join(outDir, filename)
  fs.writeFileSync(outPath, JSON.stringify(backup, null, 2), 'utf8')

  console.log('')
  console.log('✅ Backup complete!')
  console.log('   File:', outPath)
  console.log('   Size:', (fs.statSync(outPath).size / 1024).toFixed(1), 'KB')
  console.log('   Pages backed up:', rows.length)
  rows.forEach(r => console.log(`     - ${r.path}  (updated ${r.updated_at})`))
}

main().catch(err => {
  console.error('FATAL:', err.message || err)
  process.exit(1)
})
