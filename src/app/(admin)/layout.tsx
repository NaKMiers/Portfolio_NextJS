import AppProvider from '@/context/AppContext'
import SiteChrome from '@/components/site/SiteChrome'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider bootstrapOnMount>
      <SiteChrome>{children}</SiteChrome>
    </AppProvider>
  )
}
