import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/motion';

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ to, duration = 1.2, prefix = '', suffix = '', className }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, latest => `${prefix}${Math.round(latest)}${suffix}`);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      motionValue.set(to);
      return;
    }
    const controls = animate(motionValue, to, {
      duration: duration,
      ease: 'easeOut'
    });
    return controls.stop;
  }, [to, duration, motionValue, prefersReducedMotion]);

  return <motion.span className={className}>{rounded}</motion.span>;
};

export default CountUp;