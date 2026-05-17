import Header from '@/components/Header'
import Nav from '@/components/Nav'
import ProfileFetchStatus from '@/components/ProfileFetchStatus'
import TopLeftImg from '@/components/TopLeftImg'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className='page bg-site text-white bg-cover bg-no-repeat font-sora relative'>
      <TopLeftImg />
      <Nav />
      <Header />
      <ProfileFetchStatus />
      {children}
    </div>
  )
}
