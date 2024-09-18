'use client'

// icons
import { FaBootstrap, FaCss3, FaFigma, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa'

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiCsharp,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiPug,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

import { BsFiletypeScss } from 'react-icons/bs'

import { motion } from 'framer-motion'
import { useState } from 'react'
import CountUp from 'react-countup'
import Avatar from '../components/Avatar'
import { fadeIn } from '../utils/variants'

type AboutDataItem = {
  title: string
  info: {
    title: string
    icons?: React.ReactNode[]
    stage?: string
  }[]
}

const aboutData: AboutDataItem[] = [
  {
    title: 'READ FIRST',
    info: [
      {
        title: 'Things only I do for my clients:',
      },
      {
        title:
          '1️⃣ Great effort. I am willing to spend 80% of my day researching problems and solutions to help you get the best product possible',
      },
      {
        title:
          '2️⃣ I am not the type to wait until the end of the shift to shut down the laptop. Working extra hours to help my clients get what they are looking for is my happiness.',
      },
      {
        title:
          '3️⃣ Sincere, attitude and creating good relationships with clients are the top criteria in my work',
      },
      {
        title:
          '4️⃣ And I am willing to give you your money back if you are disappointed with my results. For me, satisfactions are more important than money',
      },
    ],
  },
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
          <SiTypescript key={14} />,
          <SiNextdotjs key={15} />,
          <SiFirebase key={16} />,
          <SiCsharp key={17} />,
          <SiDotnet key={18} />,
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [
          <FaFigma key={19} />,
          <SiAdobephotoshop key={20} />,
          <SiAdobeillustrator key={21} />,
          <SiAdobepremierepro key={22} />,
        ],
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'Full Stack Developer - Upwork - ',
        stage: '2022 - Present',
      },
      {
        title: 'Full Stack Developer - Fiverr - ',
        stage: '2022 - Present',
      },
      {
        title: 'HUFLIT University Student - HUFLIT - ',
        stage: '2022 - Present',
      },
    ],
  },
  {
    title: 'Certificate',
    info: [
      {
        title: 'HTML - CSS - F8 - ',
        stage: '2022',
      },
      {
        title: 'Responsive Web Design - ',
        stage: '2022',
      },
      {
        title: 'JavaScript Basic - F8 - ',
        stage: '2022',
      },
      {
        title: 'JavaScript Advanced - F8 - ',
        stage: '2022',
      },

      {
        title: 'WPS Certification - Ratatype - ',
        stage: '2023',
      },
    ],
  },
]

const About = () => {
  const [index, setIndex] = useState(0)

  return (
    <div className='min-h-screen xl:pb-0 bg-primary/60 bg-gradient-to-r from-primary/10 py-32 text-center xl:text-left'>
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden max-w-[510px] xl:flex absolute bottom-0 right-[6vw] -z-10'
      >
        <Avatar />
      </motion.div>

      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row xl:items-start gap-x-6 max-w-[1080px]'>
        <div className='w-full xl:w-[55%] flex flex-col justify-center'>
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
            4 years ago I discovered my passion for programming when I was a high school student and from
            there I had to sacrifice many things to become a full stack developer at the age of 18.
          </motion.p>

          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
          >
            <div className='flex flex-1 xl:gap-x-6'>
              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={4} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Years of experience
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={5500} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Hours Of Coding
                </div>
              </div>

              <div className='relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={60} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Finished projects
                </div>
              </div>

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

        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:w-[45%] max-w-[500px] overflow-scroll no-scrollbar'
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
                <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                <div className=''>{item.stage}</div>
                <div className='flex gap-x-4 gap-y-2 justify-center flex-wrap max-w-[350px]'>
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
  )
}

export default About
