/**
 * StaticSignupPage.tsx — Puck widget shim
 *
 * Re-exports the signup page default as SignupWidget for puck.config.tsx.
 * The actual /signup page.tsx is untouched.
 */
'use client'
export { default as SignupWidget } from './page'
