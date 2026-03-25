import { Profile } from '@/types/profile'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AppContextProps {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  loading: boolean
  error: string | null
  refetchProfile: () => Promise<void>
}

const AppContext = createContext<AppContextProps | null>(null)

function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/profile')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch profile')
      }
      setProfile(data?.profile ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch profile')
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refetchProfile()
  }, [])

  return (
    <AppContext.Provider value={{ profile, setProfile, loading, error, refetchProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
