import { Suspense } from 'react'

import Header from '@/components/Header'
import Nav from '@/components/Nav'
import ProfileFetchStatus from '@/components/ProfileFetchStatus'
import TopLeftImg from '@/components/TopLeftImg'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className='page bg-site text-white bg-cover bg-no-repeat font-sora relative'>
      <TopLeftImg />
      {/* `Nav` reads `searchParams`; suspend until hydrated to satisfy Next static shell rules */}
      <Suspense fallback={<div className='fixed xl:right-[2%] z-50 xl:w-16 h-[60px]' />}>
        <Nav />
      </Suspense>
      <Header />
      <ProfileFetchStatus />
      {children}
    </div>
  )
}
