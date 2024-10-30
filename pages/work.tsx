'use client'

import Bulb from '../components/Bulb'
import Circles from '../components/Circles'
import WorkSlider from '../components/WorkSlider'
import { fadeIn } from '../utils/variants'
import { motion } from 'framer-motion'

const Work = () => {
  return (
    <div className='h-full bg-primary/60 bg-gradient-to-r from-primary/10 py-36 flex items-center'>
      <div className='opacity-40 scale-150 bg-left-top bg-cover origin-top-left bg-explosion bg-no-repeat w-screen h-screen fixed top-0' />

      <Circles />

      <div className='container mx-auto max-w-[1080px]'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          <div className='text-center flex flex-col xl:w-[30vw] lg:text-left mb-4 xl:mb-0'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 mt-10 xl:mt-0 z-10'
            >
              My work <span className='text-accent'>.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0 z-10 text-white/80'
            >
              Below are some of my outstanding projects. Includes many genres, e-commerce, travel,
              events, branding, portfolio, and more.
            </motion.p>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0 z-10 text-white/80'
            >
              The first two are my E-Commerce businesses
            </motion.p>
          </div>

          <motion.div
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full xl:max-w-[65%]'
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  )
}

export default Work
