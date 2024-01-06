import '@/styles/globals.css'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import TopLeftImg from '@/components/TopLeftImg'
import { Sora } from 'next/font/google'
import Head from 'next/head'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      <Head>
        <title>Portfiolo | Anh Khoa Nguyen</title>
        <meta
          name='description'
          content='I help designers, businesses and startups bring their ideas to life. Powered by passion, dream and coffee.'
        />
      </Head>
      <TopLeftImg />
      <Nav />
      <Header />
      {children}
    </div>
  )
}
