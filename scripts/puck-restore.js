#!/usr/bin/env node
/**
 * puck-restore.js
 *
 * Restores Puck CMS page content from a backup JSON file.
 *
 * Usage:
 *   # Dry-run (default — shows what would be restored, writes nothing):
 *   node scripts/puck-restore.js --backup backups/puck/puck-backup-2026-05-20-0300.json
 *
 *   # Restore a single page only:
 *   node scripts/puck-restore.js --backup <file> --path / --confirm
 *
 *   # Restore ALL pages in the backup:
 *   node scripts/puck-restore.js --backup <file> --all --confirm
 *
 * Flags:
 *   --backup <file>   Path to backup JSON file (required)
 *   --path <route>    Restore only this route (e.g. /)
 *   --all             Restore every page in the backup
 *   --confirm         Actually write to Supabase (without this, dry-run only)
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *           NEXT_PUBLIC_PUCK_WRITE_SECRET in .env.local
 */

const fs    = require('fs')
const path  = require('path')
const https = require('https')

// ── Minimal .env.local parser ─────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env.local not found')
    process.exit(1)
  }
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  const env = {}
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim()
  }
  return env
}

// ── Arg parser ────────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2)
  const result = { backup: null, path: null, all: false, confirm: false }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--backup') result.backup = args[++i]
    else if (args[i] === '--path') result.path = args[++i]
    else if (args[i] === '--all') result.all = true
    else if (args[i] === '--confirm') result.confirm = true
  }
  return result
}

// ── HTTPS POST helper ─────────────────────────────────────────────────────────
function httpsRequest(method, url, headers, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null
    const opts = {
      method,
      headers: {
        ...headers,
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    }
    const req = https.request(url, opts, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }) }
        catch { resolve({ status: res.statusCode, body: data }) }
      })
    })
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

// ── Restore a single page to Supabase via upsert ──────────────────────────────
async function restorePage(supabaseUrl, serviceKey, pagePath, data) {
  const url = `${supabaseUrl}/rest/v1/puck_pages`
  const row = {
    path:       pagePath,
    data:       data,
    updated_at: new Date().toISOString(),
  }
  const { status, body } = await httpsRequest('POST', url, {
    'apikey':          serviceKey,
    'Authorization':   `Bearer ${serviceKey}`,
    'Content-Type':    'application/json',
    'Prefer':          'resolution=merge-duplicates',
  }, [row])

  return { status, body }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs()

  if (!args.backup) {
    console.error('ERROR: --backup <file> is required')
    console.error('')
    console.error('Examples:')
    console.error('  # Dry-run (show what would restore, write nothing):')
    console.error('  node scripts/puck-restore.js --backup backups/puck/puck-backup-2026-05-20-0300.json')
    console.error('')
    console.error('  # Restore single page:')
    console.error('  node scripts/puck-restore.js --backup <file> --path / --confirm')
    console.error('')
    console.error('  # Restore all pages:')
    console.error('  node scripts/puck-restore.js --backup <file> --all --confirm')
    process.exit(1)
  }

  if (!args.path && !args.all) {
    console.error('ERROR: Specify --path <route> to restore one page, or --all to restore everything.')
    console.error('       Run without --confirm first to see a dry-run.')
    process.exit(1)
  }

  // Load backup file
  const backupPath = path.resolve(args.backup)
  if (!fs.existsSync(backupPath)) {
    console.error('ERROR: Backup file not found:', backupPath)
    process.exit(1)
  }

  let backup
  try {
    backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
  } catch (e) {
    console.error('ERROR: Could not parse backup file:', e.message)
    process.exit(1)
  }

  if (!backup.pages || !Array.isArray(backup.pages)) {
    console.error('ERROR: Backup file does not contain a valid "pages" array.')
    process.exit(1)
  }

  // Select pages to restore
  let pagesToRestore = backup.pages
  if (args.path) {
    pagesToRestore = backup.pages.filter(p => p.path === args.path)
    if (pagesToRestore.length === 0) {
      console.error(`ERROR: Path "${args.path}" not found in backup. Available paths:`)
      backup.pages.forEach(p => console.error(`  - ${p.path}`))
      process.exit(1)
    }
  }

  // Print plan
  console.log('')
  console.log('=== PUCK RESTORE UTILITY ===')
  console.log('Backup file:', backupPath)
  console.log('Backup date:', backup._meta?.created_at ?? 'unknown')
  console.log('Pages in backup:', backup.pages.length)
  console.log('')
  console.log('Pages to restore:')
  pagesToRestore.forEach(p => {
    console.log(`  - ${p.path}  (backed up at ${p.updated_at})`)
  })
  console.log('')

  if (!args.confirm) {
    console.log('DRY-RUN MODE — no changes written to Supabase.')
    console.log('')
    console.log('To execute the restore, add --confirm:')
    if (args.path) {
      console.log(`  node scripts/puck-restore.js --backup "${args.backup}" --path "${args.path}" --confirm`)
    } else {
      console.log(`  node scripts/puck-restore.js --backup "${args.backup}" --all --confirm`)
    }
    process.exit(0)
  }

  // Live restore
  const env = loadEnv()
  const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
  const serviceKey  = env['SUPABASE_SERVICE_ROLE_KEY']

  if (!supabaseUrl || !serviceKey) {
    console.error('ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  console.log('⚠️  LIVE RESTORE — writing to Supabase production database...')
  console.log('')

  let successCount = 0
  let failCount    = 0

  for (const page of pagesToRestore) {
    process.stdout.write(`  Restoring ${page.path}... `)
    try {
      const { status } = await restorePage(supabaseUrl, serviceKey, page.path, page.data)
      if (status >= 200 && status < 300) {
        console.log('✅ OK')
        successCount++
      } else {
        console.log(`❌ FAILED (HTTP ${status})`)
        failCount++
      }
    } catch (e) {
      console.log(`❌ ERROR: ${e.message}`)
      failCount++
    }
  }

  console.log('')
  if (failCount === 0) {
    console.log(`✅ Restore complete — ${successCount} page(s) restored successfully.`)
  } else {
    console.log(`⚠️  Restore finished with errors — ${successCount} succeeded, ${failCount} failed.`)
    process.exit(1)
  }
}

main().catch(err => {
  console.error('FATAL:', err.message || err)
  process.exit(1)
})
