'use client'

import axios from 'axios'
import { fadeIn } from '../utils/variants'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Contact = () => {
  const [form, setForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    subject: '',
    message: '',
  })

  const handleSubmitContactForm = async (e: any) => {
    e.preventDefault()

    try {
      await axios.post('/api/contact', form)
      setForm({
        email: '',
        firstname: '',
        lastname: '',
        subject: '',
        message: '',
      })
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-primary/60 bg-gradient-to-r from-primary/10'>
      <div className='container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 mt-10 xl:mt-0 text-center mb-12'
          >
            Let&apos;s <span className='text-accent'>talk.</span>
          </motion.h2>

          {/* form */}
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

            <button className='btn rounded-full border border-white/50 max-w-[170px] px-8 transiton-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Let&apos;s talk
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default Contact
