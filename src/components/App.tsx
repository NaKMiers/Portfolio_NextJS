'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Transition from './Transition'
import { usePathname } from 'next/navigation'

function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='h-full'
      >
        {/* <Transition /> */}
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default App
