/* ═══════════════════════════════════════════════════════════════
   CONTACT + THRIVEDESK VERIFICATION TESTS
   
   a. POST /api/contact with valid data → 200, row in DB
   b. POST /api/contact missing fields → 400
   c. Signup creates a lead (ThriveDesk no-ops cleanly)
   d. /contact loads publicly (200, no auth redirect)
   ═══════════════════════════════════════════════════════════════ */

const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY
const PORT = process.argv[2] || '3002'
const BASE = `http://localhost:${PORT}`

const results = []
function test(name, pass, detail = '') {
  results.push({ name, pass, detail })
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ` — ${detail}` : ''}`)
}

async function run() {
  const admin = createClient(SUPABASE_URL, SERVICE_KEY)
  const TEST_EMAIL = `test-contact-${Date.now()}@example.com`
  const TEST_LEAD_EMAIL = `test-lead-${Date.now()}@example.com`

  console.log('\n═══ CONTACT + THRIVEDESK TESTS ═══\n')

  // ── Test A: POST /api/contact with valid data ─────────────
  console.log('── A: Valid contact submission ──')
  const validRes = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: TEST_EMAIL,
      subject: 'Test Subject',
      message: 'This is a test message from B3 verification.',
    }),
  })
  const validBody = await validRes.json()
  test(
    'a1. POST /api/contact → 200',
    validRes.status === 200 && validBody.success === true,
    `status=${validRes.status}, success=${validBody.success}`
  )

  // Check row exists in DB
  const { data: contactRow, error: contactErr } = await admin
    .from('contact_messages')
    .select('id, name, email, subject, message, thrivedesk_synced')
    .eq('email', TEST_EMAIL)
    .single()

  test(
    'a2. Row appears in contact_messages',
    !contactErr && contactRow?.email === TEST_EMAIL,
    contactErr ? contactErr.message : `name=${contactRow?.name}, subject=${contactRow?.subject}`
  )
  test(
    'a3. thrivedesk_synced = false (no key set)',
    contactRow?.thrivedesk_synced === false,
    `thrivedesk_synced=${contactRow?.thrivedesk_synced}`
  )

  // Clean up
  if (contactRow?.id) {
    await admin.from('contact_messages').delete().eq('id', contactRow.id)
    console.log('🧹 Cleaned up test contact_message')
  }

  // ── Test B: POST /api/contact missing fields → 400 ────────
  console.log('\n── B: Missing fields ──')
  const missingRes = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test', email: TEST_EMAIL }),
    // missing message
  })
  test(
    'b. Missing message → 400',
    missingRes.status === 400,
    `status=${missingRes.status}`
  )

  // ── Test C: Signup still creates a lead ────────────────────
  console.log('\n── C: Signup lead creation ──')
  const leadRes = await fetch(`${BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test Lead', email: TEST_LEAD_EMAIL }),
  })
  const leadBody = await leadRes.json()
  test(
    'c. Signup creates lead (ThriveDesk no-ops cleanly)',
    leadRes.status === 200 && leadBody.success === true && !!leadBody.leadId,
    `status=${leadRes.status}, leadId=${leadBody.leadId}`
  )

  // Clean up lead
  if (leadBody.leadId) {
    await admin.from('leads').delete().eq('id', leadBody.leadId)
    console.log('🧹 Cleaned up test lead')
  }

  // ── Test D: /contact loads publicly ────────────────────────
  console.log('\n── D: /contact page access ──')
  const pageRes = await fetch(`${BASE}/contact`, { redirect: 'manual' })
  test(
    'd. GET /contact → 200 (public, no redirect)',
    pageRes.status === 200,
    `status=${pageRes.status}`
  )

  // ── Summary ────────────────────────────────────────────────
  console.log('\n═══ RESULTS ═══\n')
  results.forEach(r => console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.name}`))
  console.log('')
  const failed = results.filter(r => !r.pass)
  if (failed.length > 0) {
    console.log(`❌ ${failed.length} of ${results.length} FAILED`)
    process.exit(1)
  } else {
    console.log(`✅ All ${results.length} tests PASSED`)
    process.exit(0)
  }
}

run().catch(e => { console.error('Fatal:', e); process.exit(1) })
