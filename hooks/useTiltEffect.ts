

import React, { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../utils/motion';

/**
 * A hook to apply a 3D tilt effect to an element on mouse hover.
 * @returns {object} An object containing:
 * - ref: A React ref to attach to the target element.
 * - style: Motion style properties (rotateX, rotateY, etc.) to apply.
 * - onMouseMove: The mouse move event handler.
 * - onMouseLeave: The mouse leave event handler.
 */
export const useTiltEffect = () => {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const throttleTimeout = useRef<number | null>(null);
  
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20, mass: 0.1 };

    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Maps mouse Y position (from -0.5 to 0.5) to a rotation from 2deg to -2deg.
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg']);
    // Maps mouse X position (from -0.5 to 0.5) to a rotation from -2deg to 2deg.
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg']);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || prefersReducedMotion) return;

        if (throttleTimeout.current) {
            return;
        }
        
        throttleTimeout.current = window.setTimeout(() => {
            throttleTimeout.current = null;
        }, 16); // ~60fps

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        // Normalize mouse position to a range of -0.5 to 0.5
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };
  
    const handleMouseLeave = () => {
        if (prefersReducedMotion) return;
        mouseX.set(0);
        mouseY.set(0);
    };

    const style = prefersReducedMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
    };

    return { ref, style, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};