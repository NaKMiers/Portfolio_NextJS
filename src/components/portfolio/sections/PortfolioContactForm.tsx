'use client'

import { useState } from 'react'

import { EditorialPanel } from '@/components/portfolio/primitives/EditorialPanel'

const cx = (...parts: (string | undefined | false)[]) => parts.filter(Boolean).join(' ')

const fieldCls =
  'w-full rounded-xl border border-pp-line bg-pp-panel-strong/90 px-4 py-3 text-sm normal-case text-pp-text shadow-[0_1px_0_rgba(31,28,26,0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-pp-muted/75 focus:border-pp-blue/35 focus:shadow-[0_0_0_3px_rgba(51,152,255,0.12)]'

const labelCls = 'block text-[11px] font-semibold uppercase tracking-[0.14em] text-pp-muted'

type Status = { kind: 'idle' } | { kind: 'loading' } | { kind: 'success' } | { kind: 'error'; message: string }

/** Submits JSON to `POST /api/contact` - fields must match the App Router handler. */
export default function PortfolioContactForm() {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus({ kind: 'loading' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok) {
        setStatus({
          kind: 'error',
          message: data.error ?? 'Something went wrong. Please try again.',
        })
        return
      }

      setStatus({ kind: 'success' })
      setEmail('')
      setFirstname('')
      setLastname('')
      setSubject('')
      setMessage('')
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Check your connection and try again.',
      })
    }
  }

  const disabled = status.kind === 'loading'

  return (
    <EditorialPanel variant='strong' className='p-6 sm:p-8'>
      <form className='space-y-5' onSubmit={onSubmit} noValidate>
        <div className='space-y-1.5'>
          <label className={labelCls} htmlFor='contact-email'>
            Email
          </label>
          <input
            id='contact-email'
            name='email'
            type='email'
            autoComplete='email'
            required
            disabled={disabled}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={fieldCls}
            placeholder='you@example.com'
          />
        </div>

        <div className='grid gap-5 sm:grid-cols-2'>
          <div className='space-y-1.5'>
            <label className={labelCls} htmlFor='contact-firstname'>
              First name
            </label>
            <input
              id='contact-firstname'
              name='firstname'
              type='text'
              autoComplete='given-name'
              required
              disabled={disabled}
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              className={fieldCls}
            />
          </div>
          <div className='space-y-1.5'>
            <label className={labelCls} htmlFor='contact-lastname'>
              Last name
            </label>
            <input
              id='contact-lastname'
              name='lastname'
              type='text'
              autoComplete='family-name'
              required
              disabled={disabled}
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              className={fieldCls}
            />
          </div>
        </div>

        <div className='space-y-1.5'>
          <label className={labelCls} htmlFor='contact-subject'>
            Subject
          </label>
          <input
            id='contact-subject'
            name='subject'
            type='text'
            required
            disabled={disabled}
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className={fieldCls}
            placeholder='What would you like to discuss?'
          />
        </div>

        <div className='space-y-1.5'>
          <label className={labelCls} htmlFor='contact-message'>
            Message
          </label>
          <textarea
            id='contact-message'
            name='message'
            required
            disabled={disabled}
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={6}
            className={cx(fieldCls, 'min-h-[160px] resize-y')}
            placeholder='Your message…'
          />
        </div>

        {status.kind === 'error' ? (
          <p
            role='alert'
            className='rounded-lg border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-900'
          >
            {status.message}
          </p>
        ) : null}

        {status.kind === 'success' ? (
          <p
            role='status'
            className='rounded-lg border border-emerald-200/90 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-950'
          >
            Thanks - your message was sent. I will get back to you when I can.
          </p>
        ) : null}

        <div className='flex flex-wrap items-center gap-4 pt-1'>
          <button
            type='submit'
            disabled={disabled}
            className={cx(
              'inline-flex min-h-[44px] items-center justify-center rounded-full border border-pp-line bg-pp-text px-8 py-2.5 text-sm font-semibold text-[var(--pp-bg)] shadow-panel',
              'motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-blue',
              disabled && 'cursor-not-allowed opacity-60 motion-safe:hover:translate-y-0',
            )}
          >
            {status.kind === 'loading' ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>
    </EditorialPanel>
  )
}
