/**
 * /products — What Is Aurum (Products & Trust Page)
 *
 * Server component wrapper. Provides page-specific SEO metadata.
 * All interactive JSX (framer-motion, icons, hover handlers) lives
 * in ProductsClient.tsx which retains 'use client'.
 *
 * Previously this file was 'use client' which blocked export metadata —
 * visitors received only the generic layout.tsx fallback metadata.
 * This is now fixed.
 */

import type { Metadata } from 'next'
import ProductsClient from './ProductsClient'

// ── SEO Metadata ─────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'What Is Aurum — Products & Trust',
  description:
    'Understand the full Aurum ecosystem: AI trading bot, Visa crypto card, exchange, NeoBank, and AUR token. See why we vetted Aurum — licenses, leadership, and media coverage.',
  openGraph: {
    title: 'What Is Aurum — A Complete Financial Ecosystem Built on AI & Blockchain',
    description:
      'Aurum Foundation: legally registered in Hong Kong, 3 international licenses, partnerships with Binance, Bybit, and KuCoin. EX-AI Bot, NeoBank, Exchange, and Crypto Cards.',
    type: 'website',
    url: 'https://autopilotroi.com/products',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurum Products — AI Trading Bot, Crypto Card, NeoBank & Exchange',
    description:
      'AutoPilotROI\u2019s partner ecosystem: EX-AI Bot, Visa Crypto Card, Aurum Exchange, Web3 NeoBank, and AUR Token. Legally registered. Globally licensed.',
  },
  alternates: {
    canonical: 'https://autopilotroi.com/products',
  },
}

// ── Page Component ────────────────────────────────────────────────

export default function ProductsPage() {
  return <ProductsClient />
}
