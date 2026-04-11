import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function sanityFetch<T>({
  query,
  fallback,
}: {
  query: string
  fallback: T
}): Promise<T> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    if (!projectId || projectId === 'placeholder') {
      return fallback
    }
    const result = await client.fetch<T>(query)
    return result ?? fallback
  } catch {
    return fallback
  }
}
