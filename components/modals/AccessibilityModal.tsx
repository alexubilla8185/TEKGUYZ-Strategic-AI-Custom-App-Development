import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useGlobalStore } from '../../store/globalStore';
import { SCALE_FADE, usePrefersReducedMotion, SIMPLE_FADE } from '../../utils/motion';
import Button from '../common/Button';

const AccessibilityModal: React.FC = () => {
    const { setActiveModal } = useGlobalStore();
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleClose = useCallback(() => setActiveModal(null), [setActiveModal]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose]);

    const modalAnimation = prefersReducedMotion ? SIMPLE_FADE : SCALE_FADE;

    return (
        <div className="fixed inset-0 bg-black/60 z-[5000] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="accessibility-modal-title">
            <motion.div
                className="fixed inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
                onClick={handleClose}
            />
            <motion.div
                variants={modalAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-surface-container w-full max-w-lg rounded-3xl elevation-4 flex flex-col max-h-[90vh]"
                style={{ willChange: 'transform, opacity' }}
            >
                <header className="flex-shrink-0 p-5 md:p-6 flex justify-between items-center border-b border-outline-variant">
                    <h2 id="accessibility-modal-title" className="text-xl md:text-2xl font-bold text-on-surface">Accessibility Commitment</h2>
                    <Button
                      as="button"
                      variant="text"
                      onClick={handleClose}
                      className="!w-12 !h-12 !p-0 flex-shrink-0 ml-4"
                      aria-label="Close dialog"
                    >
                      <X size={24} />
                    </Button>
                </header>
                
                <div className="flex-grow overflow-y-auto p-6 md:p-8 modal-scroll-content prose-legal">
                    <p>We are committed to ensuring our website is accessible to all users. We strive to meet WCAG 2.1 Level AA standards.</p>
                    <p>Our accessibility features include:</p>
                    <ul className="mb-5">
                        <li>Keyboard navigation support</li>
                        <li>Screen reader compatibility</li>
                        <li>Adjustable color themes</li>
                        <li>Minimum touch target sizes</li>
                        <li>Reduced motion options</li>
                    </ul>
                    <p>We welcome feedback on our site's accessibility. If you encounter any barriers, please contact us at <a href="mailto:accessibility@tekguyz.com">accessibility@tekguyz.com</a>.</p>
                    <p className="text-sm mt-6">Last reviewed: January 2025</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AccessibilityModal;