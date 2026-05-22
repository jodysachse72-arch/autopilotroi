/**
 * ThriveDesk Integration Adapter
 *
 * Normalizes signup/orientation data into a ThriveDesk customer/contact payload
 * and submits it via the ThriveDesk API.
 *
 * ENV VARS REQUIRED:
 *   THRIVEDESK_API_KEY       — API key for server-side calls
 *   THRIVEDESK_INBOX_ID      — Inbox ID for new conversations (optional)
 *
 * If API key is missing, the adapter fails safely and logs clearly.
 * No secrets are hardcoded.
 */

// ── Types ────────────────────────────────────────────────────────

export interface ThriveDeskContact {
  /** Full name of the prospect */
  name: string
  /** Email address */
  email: string
  /** Referral code (if any) */
  referralCode?: string
  /** Readiness tier from orientation quiz */
  readinessTier?: 'beginner' | 'intermediate' | 'advanced'
  /** Readiness score (0-100) */
  readinessScore?: number
  /** Free-form notes */
  notes?: string
}

export interface ThriveDeskResult {
  success: boolean
  contactId?: string
  conversationId?: string
  error?: string
}

// ── Config ────────────────────────────────────────────────────────

function getConfig() {
  const apiKey = process.env.THRIVEDESK_API_KEY
  const inboxId = process.env.THRIVEDESK_INBOX_ID
  const baseUrl = process.env.THRIVEDESK_API_URL || 'https://api.thrivedesk.com/v2'

  return { apiKey, inboxId, baseUrl }
}

// ── Adapter ───────────────────────────────────────────────────────

/**
 * Submit a new contact/customer to ThriveDesk.
 *
 * Creates a contact record and optionally opens a conversation
 * so the partner/support team can follow up.
 */
export async function submitToThriveDesk(
  contact: ThriveDeskContact
): Promise<ThriveDeskResult> {
  const { apiKey, inboxId, baseUrl } = getConfig()

  // ── Fail-safe: no API key → log and return ────────────────────
  if (!apiKey) {
    console.warn(
      '[ThriveDesk] THRIVEDESK_API_KEY is not set. ' +
      'Skipping ThriveDesk submission. ' +
      'Set the env var to enable integration.'
    )
    return {
      success: false,
      error: 'THRIVEDESK_API_KEY not configured',
    }
  }

  try {
    // ── Step 1: Create or update contact ──────────────────────────
    const contactPayload = {
      firstname: contact.name.split(' ')[0] || contact.name,
      lastname: contact.name.split(' ').slice(1).join(' ') || '',
      email: contact.email,
      custom_fields: {
        referral_code: contact.referralCode || '',
        readiness_tier: contact.readinessTier || 'unknown',
        readiness_score: String(contact.readinessScore ?? ''),
        source: 'autopilotroi-onboarding',
      },
    }

    const contactRes = await fetch(`${baseUrl}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(contactPayload),
    })

    if (!contactRes.ok) {
      const errBody = await contactRes.text()
      console.error(
        `[ThriveDesk] Contact creation failed (${contactRes.status}):`,
        errBody
      )
      return {
        success: false,
        error: `Contact creation failed: ${contactRes.status}`,
      }
    }

    const contactData = await contactRes.json()
    const contactId = contactData?.data?.id || contactData?.id

    // ── Step 2: Open a conversation (optional) ───────────────────
    let conversationId: string | undefined
    if (inboxId) {
      const tierLabel = contact.readinessTier
        ? contact.readinessTier.charAt(0).toUpperCase() + contact.readinessTier.slice(1)
        : 'Unknown'

      const conversationPayload = {
        inbox_id: inboxId,
        contact_id: contactId,
        subject: `New AutoPilotROI Lead: ${contact.name} (${tierLabel})`,
        message: buildConversationMessage(contact),
        status: 'pending',
      }

      const convRes = await fetch(`${baseUrl}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(conversationPayload),
      })

      if (convRes.ok) {
        const convData = await convRes.json()
        conversationId = convData?.data?.id || convData?.id
      } else {
        console.warn(
          `[ThriveDesk] Conversation creation failed (${convRes.status}). Contact was created successfully.`
        )
      }
    }

    console.log(
      `[ThriveDesk] Contact created: ${contactId}` +
      (conversationId ? `, Conversation: ${conversationId}` : '')
    )

    return {
      success: true,
      contactId,
      conversationId,
    }
  } catch (err) {
    console.error('[ThriveDesk] Unexpected error:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

// ── Helpers ───────────────────────────────────────────────────────

function buildConversationMessage(contact: ThriveDeskContact): string {
  const lines: string[] = [
    `<h3>New AutoPilotROI Lead</h3>`,
    `<p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>`,
  ]

  if (contact.referralCode) {
    lines.push(`<p><strong>Referral Code:</strong> ${escapeHtml(contact.referralCode)}</p>`)
  }

  if (contact.readinessTier) {
    const tierLabel = contact.readinessTier.charAt(0).toUpperCase() + contact.readinessTier.slice(1)
    lines.push(
      `<p><strong>Readiness Tier:</strong> ${tierLabel}</p>`
    )
  }

  if (contact.readinessScore != null) {
    lines.push(
      `<p><strong>Readiness Score:</strong> ${contact.readinessScore}/100</p>`
    )
  }

  if (contact.notes) {
    lines.push(`<p><strong>Notes:</strong> ${escapeHtml(contact.notes)}</p>`)
  }

  lines.push(
    `<hr/>`,
    `<p style="color: #666; font-size: 0.875em;">Submitted via AutoPilotROI onboarding flow.</p>`
  )

  return lines.join('\n')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
