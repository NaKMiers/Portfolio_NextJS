import AppProvider from '@/context/AppContext'
import SiteChrome from '@/components/site/SiteChrome'
import { loadPublicProfile } from '@/lib/profile-data'

export const revalidate = 60

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await loadPublicProfile()

  return (
    <AppProvider initialProfile={profile}>
      <SiteChrome>{children}</SiteChrome>
    </AppProvider>
  )
}
