

import React from 'react';
import { motion } from 'framer-motion';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { usePrefersReducedMotion, makeMotionStyles } from '../../utils/motion';
import { useRipple } from '../../hooks/useRipple';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { addRipple, RippleElements } = useRipple<HTMLDivElement>({ duration: 600 });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      addRipple(event);
      onClick(event);
    }
  };

  const motionStyle = { ...style };
  if (!prefersReducedMotion) {
      motionStyle.willChange = 'transform, box-shadow';
  }

  return (
    <div style={{ perspective: '1000px' }}>
        <motion.div
            ref={ref}
            className={`relative bg-surface-container-low rounded-3xl p-5 md:p-6 overflow-hidden ${className}`}
            // FIX: Pass the entire style object from the hook. Motion values like rotateX/Y cannot be props.
            style={makeMotionStyles(motionStyle)}
            whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick ? handleClick : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            <div 
              className="absolute inset-0 bg-primary-50/0 hover:bg-primary-50/[.08] transition-colors duration-300 pointer-events-none" 
              style={{ transform: 'translateZ(-1px)' }} 
            />
            {children}
            {onClick && <RippleElements />}
        </motion.div>
    </div>
  );
};

export default Card;