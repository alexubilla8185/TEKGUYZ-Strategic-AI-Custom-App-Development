import React, { useState, useEffect, useRef } from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { X } from 'lucide-react';
import { useFormStore } from '../../store/formStore';
import { useGlobalStore } from '../../store/globalStore';
import Button from '../common/Button';
import ProjectFormStepper from './form/ProjectFormStepper';
import { SCALE_FADE, SCALE_SLIDE_FADE, usePrefersReducedMotion, SIMPLE_FADE } from '../../utils/motion';
import { useRipple } from '../../hooks/useRipple';

const ProjectFormModal: React.FC = () => {
    const { setActiveModal } = useGlobalStore.getState();
    const { hasUserData } = useFormStore();
    const [isConfirmingClose, setIsConfirmingClose] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const modalRef = useRef<HTMLDivElement>(null);
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>();
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleAttemptClose = () => {
        if (hasUserData()) {
            setIsConfirmingClose(true);
        } else {
            handleClose();
        }
    };
    
    const handleAttemptCloseWithRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(event);
        handleAttemptClose();
    };

    const handleClose = () => {
        setIsConfirmingClose(false);
        setActiveModal(null);
    };
    
    const handleConfirmLeave = () => {
        handleClose();
        // The resetForm is called by setActiveModal(null) in globalStore
    };
    
    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isConfirmingClose) {
                    setIsConfirmingClose(false);
                } else {
                    handleAttemptClose();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isConfirmingClose, hasUserData]);

    // Focus Trap
    useEffect(() => {
        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = (Array.from(
            modalNode.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ) as HTMLElement[]).filter(el => !el.hasAttribute('disabled'));

        // NOTE: Initial focus is handled by the ProjectFormStepper component to avoid a focus jump.
        // This effect is only for trapping tab navigation.

        const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key !== 'Tab' || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        };
        
        modalNode.addEventListener('keydown', handleTabKeyPress);
        return () => modalNode.removeEventListener('keydown', handleTabKeyPress);
    }, []);

    // FIX: Explicitly type variants and easing arrays to resolve framer-motion type errors.
    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0.1 : 0.4, ease: 'easeIn' } },
    };

    const mobileEaseIn: [number, number, number, number] = [0.4, 0.0, 1, 1];
    const mobileEaseOut: [number, number, number, number] = [0.4, 0.0, 0.2, 1];
    const mobileSlideVariants: Variants = {
        hidden: { y: "100%" },
        visible: { 
            y: 0,
            transition: { duration: 0.5, ease: mobileEaseOut }
        },
        exit: { 
            y: "100%",
            transition: { duration: 0.4, ease: mobileEaseIn }
        }
    };
    
    const dialogVariants: Variants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    };

    const modalAnimationVariants = prefersReducedMotion ? SIMPLE_FADE : (isMobile ? mobileSlideVariants : SCALE_SLIDE_FADE);

    return (
        <div 
            className="fixed inset-0 bg-black/80 supports-backdrop-blur:backdrop-blur-[8px] z-[4000] flex items-center justify-center"
            aria-labelledby="project-form-title"
            aria-modal="true"
            role="dialog"
        >
            <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0"
                onClick={handleAttemptClose}
            />
            
            <motion.div
                ref={modalRef}
                variants={modalAnimationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-surface elevation-5 w-full h-full md:max-w-[680px] md:max-h-[90vh] md:rounded-[28px] flex flex-col overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
            >
                <h1 id="project-form-title" className="sr-only">Project intake form</h1>
                <button
                    onClick={handleAttemptCloseWithRipple}
                    className="absolute top-4 right-4 w-12 h-12 bg-surface-container-highest/90 rounded-full flex items-center justify-center z-[10] hover:bg-surface-container-highest hover:scale-105 transition-all overflow-hidden"
                    aria-label="Close form"
                >
                    <X size={24} />
                    <RippleElements />
                </button>
                
                <ProjectFormStepper />
            </motion.div>

            <AnimatePresence>
                {isConfirmingClose && (
                    <div className="absolute inset-0 z-[4100] flex items-center justify-center p-4 bg-black/50">
                        <motion.div
                            variants={prefersReducedMotion ? SIMPLE_FADE : dialogVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-surface-container-high p-6 rounded-2xl max-w-sm w-full elevation-5"
                            role="alertdialog"
                            aria-labelledby="confirm-close-title"
                            aria-describedby="confirm-close-desc"
                        >
                            <h2 id="confirm-close-title" className="text-xl font-bold text-on-surface">Leave without submitting?</h2>
                            <p id="confirm-close-desc" className="text-on-surface-variant mt-2 mb-6">Your progress won't be saved.</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="text" onClick={() => setIsConfirmingClose(false)}>Cancel</Button>
                                <Button variant="secondary" className="!bg-error/10 !text-error hover:!bg-error/20" onClick={handleConfirmLeave}>Leave</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectFormModal;