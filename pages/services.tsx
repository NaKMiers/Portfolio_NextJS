'use client'

import Bulb from '../components/Bulb'
import Circles from '../components/Circles'
import ServiceSlider from '../components/ServiceSlider'
import { fadeIn } from '../utils/variants'
import { motion } from 'framer-motion'
import {} from 'react-icons/rx'

const Services = () => {
  return (
    <div className='min-h-screen bg-primary/60 bg-gradient-to-r from-primary/10 py-36 flex items-center overflow-x-hidden w-'>
      <div className='opacity-40 scale-150 bg-[55%] bg-cover origin-top bg-explosion bg-no-repeat w-screen h-screen fixed top-0' />

      <Circles />

      <div className='relative z-10 container mx-auto max-w-[1080px]'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          <div className='text-center flex flex-col xl:w-[30vw] lg:text-left mb-4 xl:mb-0'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 mt-10 xl:mt-0 z-10'
            >
              My services
            </motion.h2>
            <motion.div
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0 z-10'
            >
              <span className='opacity-80'>
                I&apos;m a full-stack developer specializing in web development. I offer:
              </span>
              <ul className='list-disc pl-4 opacity-80'>
                <li>Front-end & Back-end Development</li>
                <li>Performance Optimization</li>
                <li>Custom Website By Demand</li>
                <li>Making E-Commerce & Portfolio Websites</li>
                <li>APIs Integration</li>
                <li>AI Integrated Web Application</li>
                <li>...</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full xl:max-w-[65%]'
          >
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  )
}

export default Services
