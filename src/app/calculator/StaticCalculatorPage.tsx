/**
 * StaticCalculatorPage.tsx — Puck widget shim
 *
 * This file exists so puck.config.tsx can import CalculatorWidget
 * without changing the actual calculator page.tsx at all.
 * The visual output is identical to the full /calculator page.
 */
'use client'
export { default as CalculatorWidget } from './page'
