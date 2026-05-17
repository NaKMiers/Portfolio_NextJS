import React from 'react'

export default function Section({
  title,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string
  badge?: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <details
      open={defaultOpen}
      className='group rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]'
    >
      <summary className='cursor-pointer list-none px-5 py-4'>
        <div className='flex items-center gap-3'>
          <div className='text-sm font-semibold tracking-wide text-zinc-100'>{title}</div>
          {badge ? (
            <span className='rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-300'>
              {badge}
            </span>
          ) : null}
          <div className='ml-auto text-xs text-zinc-400 transition-opacity group-open:opacity-0'>Hide</div>
        </div>
      </summary>
      <div className='px-5 pb-5'>
        <div className='mb-5 h-px bg-zinc-800' />
        {children}
      </div>
    </details>
  )
}

