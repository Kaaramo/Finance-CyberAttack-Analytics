import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CyberAttack Analytics Dashboard',
  description: 'Analyse de données de cyberattaques dans le secteur financier (2015-2025)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
