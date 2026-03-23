"use client"

/*
 * PageTransition — Smooth page transition wrapper using Framer Motion
 * Adapted from manus-frontend-design; 60fps GPU-accelerated
 */
import { motion } from "framer-motion"
import { type ReactNode, memo } from "react"

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter:   { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
}

const pageTransition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const PageTransition = memo(({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
})

PageTransition.displayName = "PageTransition"

export default PageTransition
