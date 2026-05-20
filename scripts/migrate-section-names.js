/**
 * migrate-section-names.js
 *
 * One-time migration: add sectionName to existing SectionBox instances
 * in the live production puck_pages table.
 *
 * Safe to run multiple times — only adds sectionName where missing,
 * never overwrites an existing value.
 *
 * Usage:
 *   node scripts/migrate-section-names.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const SECTION_NAME_MAP = {
  'stats-section':        'Stats Bar (12,000+ Members etc.)',
  'features-section':     'Features / Benefits',
  'process-section':      'How It Works (3 Steps)',
  'ecosystem-section':    'Ecosystem Products (4 Cards)',
  'testimonials-section': 'Testimonials (Social Proof)',
  // /products page
  'box-stats':    'Stats Bar (Blue)',
  'box-trust':    'Why We Chose Aurum',
  'box-products': 'The Aurum Product Suite',
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  console.log('Connecting to Supabase…')
  const { data: pages, error } = await supabase
    .from('puck_pages')
    .select('path, data')

  if (error) {
    console.error('❌  Error fetching pages:', error.message)
    process.exit(1)
  }

  console.log(`Found ${pages.length} page(s)`)
  let totalPatched = 0

  for (const page of pages) {
    const content = page.data?.content || []
    let changed = false

    const updatedContent = content.map(block => {
      if (block.type !== 'SectionBox') return block
      const id = block.props?.id
      const existingName = block.props?.sectionName

      // Already has a name — skip
      if (existingName && existingName.trim() !== '') return block

      // Look up a friendly name by ID
      const friendlyName = SECTION_NAME_MAP[id] || ''

      if (!friendlyName) return block // Unknown section — leave blank

      console.log(`  [${page.path}] ${id} → "${friendlyName}"`)
      changed = true
      return {
        ...block,
        props: { ...block.props, sectionName: friendlyName },
      }
    })

    if (!changed) {
      console.log(`  [${page.path}] No changes needed`)
      continue
    }

    const updatedData = { ...page.data, content: updatedContent }
    const { error: updateError } = await supabase
      .from('puck_pages')
      .update({ data: updatedData, updated_at: new Date().toISOString() })
      .eq('path', page.path)

    if (updateError) {
      console.error(`  ❌  Failed to update ${page.path}:`, updateError.message)
    } else {
      console.log(`  ✅  Updated ${page.path}`)
      totalPatched++
    }
  }

  console.log(`\nMigration complete — ${totalPatched} page(s) updated`)
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
