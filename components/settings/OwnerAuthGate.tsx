import React, { useEffect, useState } from 'react'

import { inputCls, labelCls, primaryBtnCls, secondaryBtnCls } from '@/components/settings/settings-utils'

export default function OwnerAuthGate({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        setChecking(true)
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        setAuthed(!!data?.ok)
      } catch {
        setAuthed(false)
      } finally {
        setChecking(false)
      }
    }
    void run()
  }, [])

  const requestCode = async () => {
    setBusy(true)
    setError(null)
    setInfo(null)
    try {
      const res = await fetch('/api/auth/request-code', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to request code')
      setStep('verify')
      setInfo('Code sent to owner email. Enter the 6-digit code.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to request code')
    } finally {
      setBusy(false)
    }
  }

  const verifyCode = async () => {
    setBusy(true)
    setError(null)
    setInfo(null)
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Verification failed')
      setAuthed(true)
      setInfo('Verified. Access granted for 24 hours.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verification failed')
    } finally {
      setBusy(false)
    }
  }

  if (checking) {
    return (
      <div className='z-50 relative min-h-screen bg-zinc-950/50 text-zinc-100 pt-12'>
        <div className='mx-auto max-w-xl px-4 py-10'>
          <div className='rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6'>
            <div className='text-sm text-zinc-300'>Checking access…</div>
          </div>
        </div>
      </div>
    )
  }

  if (authed) return <>{children}</>

  return (
    <div className='z-50 relative min-h-screen bg-zinc-950/50 text-zinc-100 pt-12'>
      <div className='mx-auto max-w-xl px-4 py-10'>
        <div className='rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6'>
          <div className='text-lg font-semibold'>Owner access required</div>
          <div className='mt-1 text-sm text-zinc-400'>
            Request a login code. If verified, this browser will be allowed for 24 hours.
          </div>

          {error ? (
            <div className='mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100'>
              {error}
            </div>
          ) : null}
          {info ? (
            <div className='mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100'>
              {info}
            </div>
          ) : null}

          <div className='mt-5 space-y-4'>
            {step === 'request' ? (
              <button type='button' className={primaryBtnCls} disabled={busy} onClick={requestCode}>
                {busy ? 'Sending…' : 'Send code to owner email'}
              </button>
            ) : (
              <>
                <div className='space-y-2'>
                  <label className={labelCls}>6-digit code</label>
                  <input
                    className={inputCls}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder='123456'
                    inputMode='numeric'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <button type='button' className={primaryBtnCls} disabled={busy} onClick={verifyCode}>
                    {busy ? 'Verifying…' : 'Verify'}
                  </button>
                  <button
                    type='button'
                    className={secondaryBtnCls}
                    disabled={busy}
                    onClick={() => {
                      setStep('request')
                      setCode('')
                      setError(null)
                      setInfo(null)
                    }}
                  >
                    Back
                  </button>
                  <button type='button' className={secondaryBtnCls} disabled={busy} onClick={requestCode}>
                    Resend code
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

