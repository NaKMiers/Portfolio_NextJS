import React from 'react'

export default function SettingErrorBanner({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className='mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200'>
      {message}
    </div>
  )
}
