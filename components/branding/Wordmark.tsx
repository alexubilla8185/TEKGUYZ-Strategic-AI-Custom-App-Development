

import React from 'react';
import { motion } from 'framer-motion';

const word = 'TEKGUYZ';
const colors: { [key: string]: string } = {
  'T': '#4285F4',
  'E': '#EA4335',
  'K': '#FBBC05',
  'G': '#4285F4',
  'U': '#34A853',
  'Y': '#EA4335',
  'Z': '#4285F4',
};

const Wordmark: React.FC<{ className?: string }> = ({ className = '' }) => {
  const baseClasses = "hidden md:flex items-center";
  const stylingClasses = className || "text-xl font-extrabold tracking-normal";
  const finalClasses = `${baseClasses} ${stylingClasses}`;
  
  return (
    <motion.div
      className={finalClasses}
      style={{ fontFamily: "'Poppins', sans-serif" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10, duration: 200 }}
      aria-label="TEKGUYZ"
    >
      {word.split('').map((letter, index) => (
        <span key={index} style={{ color: colors[letter], opacity: 'var(--wordmark-opacity, 1)' }}>
          {letter}
        </span>
      ))}
    </motion.div>
  );
};

export default Wordmark;