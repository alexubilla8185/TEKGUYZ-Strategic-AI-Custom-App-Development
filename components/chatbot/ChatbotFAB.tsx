import React, { useState, useEffect } from 'react';
// FIX: Import Variants type from framer-motion.
import { motion, AnimatePresence, useAnimationControls, Variants } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { useGlobalStore } from '../../store/globalStore';
import { useRipple } from '../../hooks/useRipple';
import { usePrefersReducedMotion, SIMPLE_FADE } from '../../utils/motion';

const ChatbotFAB: React.FC = () => {
    const { isChatOpen, toggleChat, activeModal } = useGlobalStore();
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>({ color: 'bg-white/30' });
    const controls = useAnimationControls();
    const prefersReducedMotion = usePrefersReducedMotion();

    // Use Intersection Observer to show the FAB only when the hero section is out of view.
    useEffect(() => {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        // The FAB should be visible when the hero section is NOT intersecting with the viewport.
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(!entry.isIntersecting),
            // A threshold of 0 means the callback triggers as soon as the element
            // enters or leaves the viewport completely.
            { threshold: 0 }
        );

        observer.observe(heroSection);
        return () => { if (heroSection) observer.unobserve(heroSection); };
    }, []);

    const easeAccelerate: [number, number, number, number] = [0.4, 0.0, 1, 1];
    // FIX: Explicitly type fabVariants with the Variants type to resolve type inference issues.
    const fabVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)', // elevation-3
            transition: { type: 'spring', mass: 0.5, stiffness: 150, damping: 15 }
        },
        exit: { 
            scale: 0,
            opacity: 0,
            transition: { duration: 0.3, ease: easeAccelerate } // Emphasized accelerate
        }
    };
    
    // Trigger entry animation
    useEffect(() => {
        if (isVisible && !isChatOpen) {
            controls.start('visible');
        }
    }, [isVisible, isChatOpen, controls]);
    
    // Idle Pulse Animation logic
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

        if (prefersReducedMotion) return;

        const startPulsing = () => {
            interval = setInterval(() => {
                // Check conditions inside interval to prevent stale state issues
                if (!isHovered && !useGlobalStore.getState().isChatOpen) {
                     controls.start({
                        scale: [1, 1.08, 1],
                        boxShadow: [
                            '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)', // elevation-3
                            '0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)', // elevation-4
                            '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)'  // elevation-3
                        ],
                        transition: { duration: 0.8, ease: 'easeInOut' }
                    });
                }
            }, 3000);
        };
        
        if (isVisible && !isChatOpen && !isHovered) {
            startPulsing();
        } else {
            if (interval) clearInterval(interval);
            // Stop any ongoing pulse and return to visible state
            controls.stop();
            if(isVisible && !isChatOpen) controls.start('visible');
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };

    }, [isVisible, isChatOpen, isHovered, controls, prefersReducedMotion]);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(event);
        toggleChat(true);
    };

    const fabStyle: React.CSSProperties = {
        right: isMobile ? `calc(20px + env(safe-area-inset-right))` : '24px',
        bottom: isMobile ? `calc(20px + env(safe-area-inset-bottom))` : '24px',
    };
    
    return (
        <AnimatePresence>
            {isVisible && !isChatOpen && !activeModal && (
                <motion.button
                    onClick={handleClick}
                    style={fabStyle}
                    className={`
                        fixed w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-50 to-primary-80 text-white 
                        flex items-center justify-center z-[1000] overflow-hidden
                        cursor-pointer
                        md:rounded-[16px]
                        max-md:rounded-[24px]
                    `}
                    variants={prefersReducedMotion ? SIMPLE_FADE : fabVariants}
                    initial="hidden"
                    animate={controls}
                    exit="exit"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Open chat assistant"
                >
                    <MessageCircle size={isMobile ? 22 : 24} strokeWidth={2.5} className="relative z-10" />
                    <RippleElements />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ChatbotFAB;