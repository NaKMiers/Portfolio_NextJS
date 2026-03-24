import { Profile } from '@/types/profile'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AppContextProps {
  profile: Profile | null
  setProfile: (profile: Profile) => void
}

const AppContext = createContext<AppContextProps | null>(null)

function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile')
      const data = await response.json()
      setProfile(data.profile)
    }
    fetchProfile()
  }, [])

  console.log(profile)
  return <AppContext.Provider value={{ profile, setProfile }}>{children}</AppContext.Provider>
}

export default AppProvider

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
