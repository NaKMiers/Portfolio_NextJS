import React from 'react'
import { LuLoader2 } from 'react-icons/lu'

import { useApp } from '@/context/AppContext'

export default function ProfileFetchStatus() {
  const { loading, error, refetchProfile } = useApp()

  if (loading) {
    return (
      <div className='fixed bottom-4 left-4 z-[90] flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80 backdrop-blur'>
        <LuLoader2 className='animate-spin' size={16} />
        Loading profile...
      </div>
    )
  }

  if (error) {
    return (
      <div className='fixed bottom-4 left-4 z-[90] max-w-[min(520px,calc(100vw-2rem))] rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-100 backdrop-blur'>
        <div className='font-semibold'>Profile load failed</div>
        <div className='mt-0.5 text-rose-100/80'>{error}</div>
        <button
          type='button'
          onClick={() => void refetchProfile()}
          className='mt-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-medium text-rose-100 hover:bg-rose-500/15'
        >
          Retry
        </button>
      </div>
    )
  }

  return null
}
