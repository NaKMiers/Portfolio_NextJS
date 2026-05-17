import React from 'react'

import { primaryBtnCls, secondaryBtnCls } from '@/components/settings/settings-utils'
import type { UploadingState } from '@/components/settings/types'

export default function SettingToolbar({
  saving,
  uploading,
  onFillMock,
  onSave,
}: {
  saving: boolean
  uploading: UploadingState
  onFillMock: () => void
  onSave: () => void
}) {
  return (
    <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>Edit Portfolio Profile</h1>
          <span className='rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200'>
            One page editor
          </span>
        </div>
        <p className='mt-1 text-sm text-zinc-400'>
          Update your content here and the site will reflect it automatically.
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        {process.env.NODE_ENV === 'development' && (
          <button type='button' className={secondaryBtnCls} onClick={onFillMock}>
            Fill mock data
          </button>
        )}
        <button
          type='button'
          onClick={onSave}
          disabled={
            saving ||
            uploading.avatar ||
            uploading.background ||
            uploading.cv ||
            Object.values(uploading.projects).some(Boolean)
          }
          className={`${primaryBtnCls} min-w-[160px]`}
        >
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </div>
    </div>
  )
}
