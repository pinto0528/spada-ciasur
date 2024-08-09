import contentstyles from '../../styles/content.module.css'
import '../../styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={contentstyles.html}>
      <body>{children}</body>
    </html>
  )
}
