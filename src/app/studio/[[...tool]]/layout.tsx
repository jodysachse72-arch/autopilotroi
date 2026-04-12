/**
 * Studio layout — removes the site navbar/footer
 * so the Sanity Studio has full viewport control
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
