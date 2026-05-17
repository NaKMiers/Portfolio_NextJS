'use client'

import axios from 'axios'
import type { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import { type FormEvent, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

import { useApp } from '@/context/AppContext'
import { fadeIn } from '@/utils/variants'

type ContactApiResponse = { ok?: boolean; error?: string }

function getContactErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseData = (error as AxiosError<ContactApiResponse>).response?.data
    return responseData?.error || 'Unable to send your message right now. Please try again later.'
  }

  return 'Unable to send your message right now. Please try again later.'
}

export default function ContactPage() {
  const { profile } = useApp()
  const [form, setForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    subject: '',
    message: '',
  })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitContactForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      await axios.post<ContactApiResponse>('/api/contact', form)
      setForm({
        email: '',
        firstname: '',
        lastname: '',
        subject: '',
        message: '',
      })
      setSubmitSuccess('Thank you for your message! I will get back to you soon.')
    } catch (error) {
      setSubmitError(getContactErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-primary/60 bg-gradient-to-r from-primary/10'>
      <div
        className='opacity-40 bg-[55%] bg-cover bg-no-repeat w-screen h-screen fixed top-0'
        style={{
          backgroundImage: profile?.backgroundImage ? `url(${profile.backgroundImage})` : undefined,
        }}
      />

      <div className='relative z-10 container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full'>
        <div className='flex flex-col w-full max-w-[700px]'>
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 mt-10 xl:mt-0 text-center mb-12'
          >
            Let&apos;s <span className='text-accent'>talk.</span>
          </motion.h2>

          <motion.form
            onSubmit={handleSubmitContactForm}
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
          >
            <input
              className='input normal-case'
              type='email'
              placeholder='Email'
              required
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            />

            <div className='flex gap-x-6 w-full'>
              <input
                className='input'
                type='text'
                placeholder='Firstname'
                required
                value={form.firstname}
                onChange={e => setForm(prev => ({ ...prev, firstname: e.target.value }))}
              />
              <input
                className='input'
                type='text'
                placeholder='Lastname'
                required
                value={form.lastname}
                onChange={e => setForm(prev => ({ ...prev, lastname: e.target.value }))}
              />
            </div>

            <input
              className='input'
              type='text'
              placeholder='subject'
              required
              value={form.subject}
              onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
            />
            <textarea
              className='textarea'
              placeholder='message'
              required
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              value={form.message}
            />

            {submitError ? (
              <div className='rounded-2xl border border-rose-300/50 bg-rose-500/10 px-5 py-4 text-left text-sm text-rose-100'>
                {submitError}
              </div>
            ) : null}

            {submitSuccess ? (
              <div className='rounded-2xl border border-emerald-300/40 bg-emerald-500/10 px-5 py-4 text-left text-sm text-emerald-100'>
                {submitSuccess}
              </div>
            ) : null}

            <button
              type='submit'
              disabled={isSubmitting}
              className='btn rounded-full border border-white/80 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group disabled:cursor-not-allowed disabled:opacity-70'
            >
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                {isSubmitting ? 'Sending...' : `Let's talk`}
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
