import { useMediaQuery } from 'react-responsive';

export const usePrefersReducedMotion = () => {
  return useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });
};

// --- Easing Curves ---
const EMPHASIZED_DECELERATE: [number, number, number, number] = [0.4, 0.0, 0.2, 1];
const EMPHASIZED_ACCELERATE: [number, number, number, number] = [0.4, 0.0, 1, 1];
const DECELERATE: [number, number, number, number] = [0.4, 0.0, 0.2, 1];

export const TRANSITION_EMPHASIZED = {
  duration: 0.6,
  ease: EMPHASIZED_DECELERATE
};

// --- Reduced Motion Variants ---
export const SIMPLE_FADE = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

export const SIMPLE_STAGGER_CONTAINER = {
    hidden: {},
    visible: {},
};

export const SIMPLE_STAGGER_CHILD = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
};


// --- Core Animation Variants ---

/**
 * Animate an element fading and sliding up into view.
 */
export const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: EMPHASIZED_DECELERATE
    }
  }
};

/**
 * A container variant for staggering the animation of its children.
 * Use with FADE_UP_STAGGER_CHILD.
 */
export const FADE_UP_STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

/**
 * A child variant for use with FADE_UP_STAGGER_CONTAINER.
 */
export const FADE_UP_STAGGER_CHILD = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: EMPHASIZED_DECELERATE }
  }
};

/**
 * Animate an element scaling and fading in/out. Ideal for modals.
 */
export const SCALE_FADE = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: EMPHASIZED_DECELERATE
    }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.3, ease: EMPHASIZED_ACCELERATE }
  }
};

/**
 * Animate an element scaling, sliding and fading in/out. Ideal for larger desktop modals.
 */
export const SCALE_SLIDE_FADE = {
  hidden: { opacity: 0, scale: 0.95, y: 60 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 60,
    transition: { duration: 0.4, ease: [0.4, 0.0, 1, 1] }
  }
};

/**
 * Animate an element sliding in from the right. Ideal for drawers/sheets.
 */
export const SLIDE_IN_RIGHT = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: {
      duration: 0.5,
      ease: DECELERATE
    }
  },
  exit: {
    x: '100%',
    transition: { duration: 0.4, ease: EMPHASIZED_ACCELERATE }
  }
};


// --- Specific Variants ---

/**
 * A directional transition for multi-step forms.
 * Requires a `custom` prop of 1 (next) or -1 (prev).
 */
export const FORM_STEP_TRANSITION = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      // FIX: Use the pre-defined easing constant to ensure correct typing.
      ease: EMPHASIZED_DECELERATE,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    transition: {
      duration: 0.2,
      // FIX: Use the pre-defined easing constant to ensure correct typing.
      ease: EMPHASIZED_DECELERATE,
    },
  }),
};