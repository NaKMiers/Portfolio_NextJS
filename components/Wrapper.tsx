'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Transition from './Transition'
import { usePathname, useRouter } from 'next/navigation'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait'>
      <motion.div className='h-full' key={pathname}>
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Wrapper
