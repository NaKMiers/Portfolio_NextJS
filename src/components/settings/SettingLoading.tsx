import React from 'react'

export default function SettingLoading() {
  return (
    <div className='z-50 relative min-h-screen bg-zinc-950/50 text-zinc-100 pt-12'>
      <div className='mx-auto max-w-6xl px-4 py-10'>
        <div className='rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6'>
          <h2 className='text-lg font-semibold'>Loading profile...</h2>
          <p className='mt-1 text-sm text-zinc-400'>Please wait.</p>
        </div>
      </div>
    </div>
  )
}
