'use client'

// icons
import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaBootstrap } from 'react-icons/fa'

import {
  SiNextdotjs,
  SiAdobephotoshop,
  SiPug,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiFirebase,
  SiAdobepremierepro,
} from 'react-icons/si'

import { BsFiletypeScss } from 'react-icons/bs'

import Avatar from '@/components/Avatar'
import Circles from '@/components/Circles'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/variants'
import CountUp from 'react-countup'
import Wrapper from '@/components/Wrapper'

type AboutDataItem = {
  title: string
  info: {
    title: string
    icons?: React.ReactNode[]
    stage?: string
  }[]
}

//  data
const aboutData: AboutDataItem[] = [
  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          <FaHtml5 key={1} />,
          <FaCss3 key={2} />,
          <FaJs key={3} />,
          <BsFiletypeScss key={4} />,
          <FaBootstrap key={5} />,
          <SiTailwindcss key={6} />,
          <FaNodeJs key={7} />,
          <SiExpress key={8} />,
          <SiMongodb key={9} />,
          <SiPug key={10} />,
          <FaReact key={11} />,
          <SiRedux key={12} />,
          <SiMui key={13} />,
          <SiNextdotjs key={14} />,
          <SiFirebase key={15} />,
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [<FaFigma key={16} />, <SiAdobephotoshop key={17} />],
      },
    ],
  },
  {
    title: 'awards',
    info: [
      {
        title: 'Webby Awards - Honoree',
        stage: '2011 - 2012',
      },
      {
        title: 'Adobe Design Achievement Awards - Finalist',
        stage: '2009 - 2010',
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'UX/UI Designer - XYZ Company',
        stage: '2012 - 2023',
      },
      {
        title: 'Web Developer - ABC Agency',
        stage: '2010 - 2012',
      },
      {
        title: 'Intern - DEF Corporation',
        stage: '2008 - 2010',
      },
    ],
  },
  {
    title: 'credentials',
    info: [
      {
        title: 'Web Development - ABC University, LA, CA',
        stage: '2011',
      },
      {
        title: 'Computer Science Diploma - AV Technical Institute',
        stage: '2009',
      },
      {
        title: 'Certified Graphic Designer - ABC Institute, Los Angeles, CA',
        stage: '2006',
      },
    ],
  },
]

const About = () => {
  const [index, setIndex] = useState(0)

  return (
    <Wrapper>
      <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
        {/* <Circles /> */}

        {/* avatar */}
        <motion.div
          variants={fadeIn('right', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='hidden max-w-[510px] xl:flex absolute bottom-0 right-[6vw] -z-10'
        >
          <Avatar />
        </motion.div>

        <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
          {/* text */}
          <div className='flex-1 flex flex-col justify-center'>
            <motion.h2
              variants={fadeIn('right', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 z-10 mt-8 xl:mt-0'
            >
              Captivating <span className='text-accent'>stories</span> birth magnifcent designs.
            </motion.h2>
            <motion.p
              variants={fadeIn('right', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'
            >
              4 years ago I discovered my passion for programming when I was a high school student
              and from there I had to sacrifice many things to become a full stack developer at the
              age of 18.
            </motion.p>

            {/* counters */}
            <motion.div
              variants={fadeIn('right', 0.6)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
            >
              <div className='flex flex-1 xl:gap-x-6'>
                {/* experience */}
                <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                  <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                    <CountUp start={0} end={3} duration={5} /> +
                  </div>
                  <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                    Years of experience
                  </div>
                </div>

                {/* clients */}
                <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                  <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                    <CountUp start={0} end={4500} duration={5} /> +
                  </div>
                  <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                    Hours Of Coding
                  </div>
                </div>

                {/* projects */}
                <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                  <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                    <CountUp start={0} end={50} duration={5} /> +
                  </div>
                  <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                    Finished projects
                  </div>
                </div>

                {/* awards */}
                <div className='relative flex-1'>
                  <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                    <CountUp start={0} end={6} duration={5} /> +
                  </div>
                  <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                    Certificates
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* info */}
          <motion.div
            variants={fadeIn('left', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex flex-col w-full xl:max-w-[48%] h-[480px]'
          >
            <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
              {aboutData.map((item, itemIndex) => (
                <div
                  className={`${
                    index === itemIndex &&
                    'text-accent after:w-[100%] after:bg-sky-500 after:transition-all after:duration-300'
                  } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                  key={itemIndex}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
              {aboutData[index].info.map((item, i) => (
                <div
                  className='flex-1 flex flex-col md:flex-row mx-w-max gap-x-2 items-center text-white/60'
                  key={i}
                >
                  {/* title */}
                  <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                  <div className='hidden md:flex'>-</div>
                  <div className=''>{item.stage}</div>
                  <div className='flex gap-x-4 gap-y-2 justify-center flex-wrap max-w-[350px]'>
                    {/* icons */}
                    {item.icons?.map((icon, i) => (
                      <div className='text-2xl text-white' key={i}>
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Wrapper>
  )
}

export default About
