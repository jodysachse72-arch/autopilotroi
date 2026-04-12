import { createClient } from 'next-sanity'

// ─── Sanity Client ──────────────────────────────────────────────────────────
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'gnd0za31',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// ─── Generic Fetch with Fallback ────────────────────────────────────────────
export async function sanityFetch<T>({
  query,
  fallback,
}: {
  query: string
  fallback: T
}): Promise<T> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gnd0za31'
    if (!projectId) {
      return fallback
    }
    const result = await client.fetch<T>(query)
    return result ?? fallback
  } catch {
    return fallback
  }
}

// ─── GROQ Queries ───────────────────────────────────────────────────────────

/** Homepage content — all editable copy */
export async function getHomePage() {
  return sanityFetch({
    query: `*[_type == "homePage"][0]{
      heroHeadline,
      heroSubheadline,
      heroVideoUrl,
      heroPrimaryCta,
      heroSecondaryCta,
      investorPathTitle,
      investorPathDescription,
      partnerPathTitle,
      partnerPathDescription,
      statsBar,
      finalCtaHeadline,
      finalCtaDescription
    }`,
    fallback: null,
  })
}

/** FAQ entries — ordered by display order */
export async function getFaqs() {
  return sanityFetch({
    query: `*[_type == "faq"] | order(order asc){
      _id,
      question,
      answer,
      category,
      order
    }`,
    fallback: null,
  })
}

/** Resources — all entries ordered by category then display order */
export async function getResources() {
  return sanityFetch({
    query: `*[_type == "resource"] | order(order asc){
      _id,
      title,
      category,
      type,
      url,
      duration,
      source,
      badge,
      note,
      order
    }`,
    fallback: null,
  })
}

/** Onboarding steps — ordered by step number */
export async function getOnboardingSteps() {
  return sanityFetch({
    query: `*[_type == "onboardingStep"] | order(stepNumber asc){
      _id,
      stepNumber,
      title,
      subtitle,
      videoUrl,
      videoLabel,
      warningText,
      whyText,
      instructions,
      externalLink
    }`,
    fallback: null,
  })
}

/** Site settings — singleton document */
export async function getSiteSettings() {
  return sanityFetch({
    query: `*[_type == "siteSettings"][0]{
      announcementText,
      announcementCta,
      announcementCtaHref,
      footerTagline,
      copyrightText
    }`,
    fallback: null,
  })
}

/** University videos — ordered by order field */
export async function getUniversityVideos() {
  return sanityFetch({
    query: `*[_type == "universityVideo"] | order(order asc){
      _id,
      title,
      youtubeId,
      description,
      category,
      duration,
      order,
      featured
    }`,
    fallback: null,
  })
}
