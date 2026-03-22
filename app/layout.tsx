import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CounselNepal — Find Your Study Abroad Counsellor',
  description: 'Connect with verified study abroad counsellors across Nepal. Find the right guidance for your international education journey.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
