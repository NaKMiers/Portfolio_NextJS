'use client'

import { Profile } from '@/types/profile'
import { normalizeProfile } from '@/lib/profile'
import { createContext, ReactNode, useContext, useEffect, useEffectEvent, useState } from 'react'

interface AppContextProps {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  loading: boolean
  error: string | null
  refetchProfile: (options?: { blocking?: boolean }) => Promise<void>
}

const AppContext = createContext<AppContextProps | null>(null)

function AppProvider({
  children,
  initialProfile,
  bootstrapOnMount,
}: {
  children: ReactNode
  initialProfile?: Profile | null
  bootstrapOnMount?: boolean
}) {
  const [profile, setProfileState] = useState<Profile | null>(initialProfile ?? null)
  const [loading, setLoading] = useState(!initialProfile && !!bootstrapOnMount)
  const [error, setError] = useState<string | null>(null)

  const setProfile = (nextProfile: Profile) => {
    setProfileState(normalizeProfile(nextProfile))
  }

  const refetchProfile = async (options?: { blocking?: boolean }) => {
    const shouldBlock = options?.blocking ?? !profile

    try {
      if (shouldBlock) {
        setLoading(true)
      }
      setError(null)
      const response = await fetch('/api/profile')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch profile')
      }
      setProfileState(data?.profile ? normalizeProfile(data.profile) : null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch profile')
      if (shouldBlock) {
        setProfileState(null)
      }
    } finally {
      if (shouldBlock) {
        setLoading(false)
      }
    }
  }

  const runBootstrapFetch = useEffectEvent(() => {
    void refetchProfile({ blocking: true })
  })

  useEffect(() => {
    if (!bootstrapOnMount || initialProfile) {
      return
    }

    const timer = window.setTimeout(() => {
      runBootstrapFetch()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [bootstrapOnMount, initialProfile])

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
