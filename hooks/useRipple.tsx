import React, { useState, useEffect, CSSProperties } from 'react';

interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

interface RippleOptions {
  duration?: number;
  color?: string;
}

export const useRipple = <T extends HTMLElement>(options?: RippleOptions) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const { duration = 300, color = 'bg-primary-50/20' } = options || {};

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [ripples, duration]);

  const addRipple = (event: React.MouseEvent<T>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;
    
    const newRipple: Ripple = {
      key: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);
  };
  
  const RippleElements = () => (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className={`absolute ${color} rounded-full pointer-events-none`}
          style={({
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: `ripple-effect ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
          }) as CSSProperties}
        />
      ))}
    </>
  );

  return { addRipple, RippleElements };
};