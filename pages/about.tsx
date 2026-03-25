'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode, useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import CountUp from 'react-countup'
import Avatar from '../components/Avatar'
import { fadeIn } from '../utils/variants'
import { useApp } from '@/context/AppContext'
import { resolveIconFromCode } from '@/utils/iconResolver'

type AboutDataItem = {
  title: string
  info: {
    title: string
    icons?: { icon?: ReactNode; label: string }[]
    stage?: string
    link?: string
  }[]
}

function formatDateRange(start?: string, end?: string): string {
  const leftRaw = (start ?? '').trim()
  const rightRaw = (end ?? '').trim()
  if (!leftRaw && !rightRaw) return ''

  const left = leftRaw ? format(parseISO(leftRaw), 'PP') : 'N/A'
  const right = rightRaw ? format(parseISO(rightRaw), 'PP') : 'Present'
  return `${left} - ${right}`
}

const About = () => {
  const { profile } = useApp()
  const [index, setIndex] = useState(0)

  const aboutData: AboutDataItem[] = useMemo(() => {
    if (!profile) return []
    return [
      {
        title: 'About Me',
        info:
          profile.aboutMe
            ?.split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => ({ title: line })) ?? [],
      },
      {
        title: 'skills',
        info: (profile.skills ?? []).map(group => ({
          title: group.groupName || 'Skills',
          icons: (group.items ?? []).map(item => ({
            icon: item.icon ? resolveIconFromCode(item.icon, 20) : undefined,
            label: item.name || 'Untitled skill',
          })),
        })),
      },
      {
        title: 'Experience',
        info: (profile.experience ?? []).map(item => ({
          title: [item.companyName, item.position].filter(Boolean).join(' - '),
          stage: formatDateRange(item.start, item.end),
        })),
      },
      {
        title: 'Education',
        info: (profile.education ?? []).map(item => ({
          title: [item.schoolName, item.major].filter(Boolean).join(' - '),
          stage: formatDateRange(item.start, item.end),
        })),
      },
      {
        title: 'Certificates',
        info: (profile.certificates ?? []).map(item => ({
          title: item.name || 'Untitled certificate',
          link: item.link || undefined,
        })),
      },
    ]
  }, [profile])

  const activeSection = aboutData[index] ?? aboutData[0]

  return (
    <div className='min-h-screen xl:pb-0 bg-primary/60 bg-gradient-to-r from-primary/10 py-32 text-center xl:text-left'>
      <div
        className='opacity-40 scale-150 bg-[55%] bg-cover origin-bottom bg-no-repeat w-screen h-screen fixed top-0'
        style={{
          backgroundImage: profile?.backgroundImage ? `url(${profile.backgroundImage})` : undefined,
        }}
      />

      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden max-w-[510px] xl:flex absolute bottom-0 right-[6vw] -z-10'
      >
        <Avatar />
      </motion.div>

      <div className='relative z-10 container mx-auto h-full flex flex-col items-center xl:flex-row xl:items-start gap-x-6 max-w-[1200px]'>
        <div className='w-full xl:w-[50%] flex flex-col justify-center'>
          <motion.h2
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 z-10 mt-8 xl:mt-0'
          >
            {profile?.profileHeading}
          </motion.h2>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-white/80'
          >
            {profile?.profileSubHeading}
          </motion.p>

          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
          >
            <div className='flex flex-1 xl:gap-x-6'>
              {profile?.stats.map(stat => (
                <div
                  className='relative after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'
                  key={stat.label + stat.value}
                >
                  <div className='text-2xl xl:text-3xl font-extrabold text-accent mb-2'>
                    <CountUp start={0} end={stat.value} duration={5} /> +
                  </div>
                  <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:w-[50%] overflow-scroll no-scrollbar relative z-10'
        >
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item, itemIndex) => (
              <div
                className={`${
                  index === itemIndex &&
                  'text-accent after:w-[100%] after:bg-sky-500 after:transition-all after:duration-300'
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemIndex)}
                key={`${item.title}-${itemIndex}`}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {(activeSection?.info ?? []).map((item, i) => (
              <div
                className='flex-1 flex flex-col md:flex-row mx-w-max gap-x-2 items-start text-white/90'
                key={`${item.title}-${i}`}
              >
                {!item.link ? (
                  <>
                    <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                    <div className='flex-shrink-0'>{item.stage}</div>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    target='_blank'
                    className='flex text-sky-300 hover:underline underline-offset-2'
                  >
                    <div className='font-light mb-2 md:mb-0'>
                      {item.title} {item.stage}
                    </div>
                  </Link>
                )}
                <div className='flex gap-x-4 gap-y-2 flex-wrap max-w-[350px]'>
                  {item.icons?.map((icon, i) => (
                    <div
                      className='text-2xl flex justify-center flex-col border p-1.5 rounded-md shadow-md gap-1 items-center text-white'
                      key={`${icon?.label ?? 'icon'}-${i}`}
                    >
                      {icon.icon ? icon.icon : null} <span className='text-xs'>{icon.label}</span>
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
