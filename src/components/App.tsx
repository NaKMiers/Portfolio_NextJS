'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Transition from './Transition'
import { usePathname } from 'next/navigation'

function MyApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className='page bg-site text-white bg-cover bg-no-repeat ${} font-sora relative'>
      {/* <AnimatePresence mode='wait'> */}
      {/* <motion.div className='h-full' key={pathname}> */}
      {/* <Transition /> */}
      {children}
      {/* </motion.div> */}
      {/* </AnimatePresence> */}
    </div>
  )
}

export default MyApp
