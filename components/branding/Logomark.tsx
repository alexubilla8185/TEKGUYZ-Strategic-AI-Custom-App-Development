import React from 'react';
// FIX: Import Variants from framer-motion to correctly type the animation variants.
import { motion, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/motion';

// FIX: Explicitly type drawVariants with the Variants type to fix type errors.
const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.1; // Start immediately, just stagger parts
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'tween', duration: 1.2, ease: [0.4, 0.0, 0.2, 1] },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const Logomark: React.FC<{ animate?: boolean, size?: number }> = ({ animate = false, size = 28 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isAnimating = animate && !prefersReducedMotion;
  
  const initial = isAnimating ? "hidden" : "visible";

  return (
    <motion.svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="TEKGUYZ Logomark"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{hidden: {opacity: 1}, visible: {opacity: 1}}}
        initial={initial}
        animate="visible"
    >
        <title>TEKGUYZ Logomark</title>
        <motion.circle 
            cx="16" 
            cy="16" 
            r="15" 
            stroke="#4285F4"
            strokeWidth="2"
            variants={drawVariants}
            custom={0}
        />
        <motion.path 
            d="M 13 10 L 9 13 L 13 16" 
            stroke="#EA4335"
            strokeWidth="2.5"
            variants={drawVariants}
            custom={1}
        />
        <motion.path 
            d="M 19 10 L 23 13 L 19 16" 
            stroke="#FBBC05"
            strokeWidth="2.5"
            variants={drawVariants}
            custom={2}
        />
        <motion.path 
            d="M 10 21 Q 16 26 22 21" 
            stroke="#34A853"
            strokeWidth="2.5"
            variants={drawVariants}
            custom={3}
        />
    </motion.svg>
  );
};

export default Logomark;