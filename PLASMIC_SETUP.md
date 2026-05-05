# Plasmic Visual Editor — Resume From Here

## What's Done
- TinaCMS fully removed
- @plasmicapp/loader-nextjs installed and integrated
- Plasmic account created, "AutopilotROI" project exists (15-day trial)
- Project ID: 3VrgjvNJnQ3r1T7Uif687c
- Code pushed to GitHub main (commit 1f0ecea)
- .env.local has NEXT_PUBLIC_PLASMIC_PROJECT_ID set

## Blocking: localhost can't be reached by Plasmic's cloud studio

## 3 Steps Tomorrow

1. Get API Token: Plasmic Studio -> AutopilotROI -> Project settings -> API Tokens
2. Add to Vercel env vars: NEXT_PUBLIC_PLASMIC_PROJECT_ID + NEXT_PUBLIC_PLASMIC_API_TOKEN -> Redeploy
3. In Plasmic: Configure custom app host -> https://YOUR-VERCEL-URL.vercel.app/plasmic-host

Once Step 3 is done, Barry sees the live site in the editor and can start editing.
