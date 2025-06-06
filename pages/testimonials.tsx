'use client'

import TestimonialSlider from '../components/TestimonialSlider'
import { fadeIn } from '../utils/variants'
import { motion } from 'framer-motion'

const Testimonials = () => {
  return (
    <div className='min-h-screen bg-primary/60 bg-gradient-to-r from-primary/10 py-32 text-center'>
      <div className='container mx-auto h-full flex flex-col justify-center'>
        <motion.h2
          variants={fadeIn('up', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='h2 mt-10 xl:mt-0 mb-8 xl:mb-0'
        >
          What clients <span className='text-accent'></span>say.
        </motion.h2>

        <motion.div
          className='max-w-[968px] xl:mx-auto'
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
  )
}

export default Testimonials
