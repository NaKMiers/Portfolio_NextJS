import type { Metadata } from 'next'
import { Sora } from 'next/font/google'

import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Anh Khoa | Full Stack Developer',
  description:
    'I help designers, businesses and startups bring their ideas to life. Powered by passion, dream and coffee.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${sora.variable} bg-site text-white`}>{children}</body>
    </html>
  )
}
