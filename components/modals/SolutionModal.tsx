import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { useGlobalStore } from '../../store/globalStore';
import { SCALE_FADE, usePrefersReducedMotion, SIMPLE_FADE } from '../../utils/motion';
import Button from '../common/Button';

const SolutionModal: React.FC = () => {
    const { activeModalData: data, setActiveModal } = useGlobalStore();
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

    if (!data) return null;
    
    const handleScrollToWork = () => {
        handleClose();
        setTimeout(() => {
            const element = document.querySelector('#work');
            if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 200);
    };
    
    const handleStartProject = () => {
        handleClose();
        setTimeout(() => {
            setActiveModal('project-form');
        }, 200);
    };

    const colorClasses: { [key: string]: { iconBg: string, text: string } } = {
        primary: { iconBg: 'bg-primary-50/10', text: 'text-primary-50' },
        error: { iconBg: 'bg-error/10', text: 'text-error' },
        warning: { iconBg: 'bg-warning/10', text: 'text-warning' },
        success: { iconBg: 'bg-success/10', text: 'text-success' },
    };
    const colors = colorClasses[data.color] || colorClasses.primary;

    const modalAnimation = prefersReducedMotion ? SIMPLE_FADE : SCALE_FADE;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
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
                className="relative bg-surface-container w-full max-w-[800px] rounded-3xl elevation-4 flex flex-col max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="solution-modal-title"
                style={{ willChange: 'transform, opacity' }}
            >
                <header className="flex-shrink-0 p-5 md:p-8 flex justify-between items-start border-b border-outline-variant">
                    <div className="flex items-center gap-4">
                         <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.3 }}
                            className={`w-18 h-18 rounded-2xl flex items-center justify-center ${colors.iconBg}`}
                         >
                            <data.icon size={36} className={colors.text} />
                        </motion.div>
                        <div>
                            <h2 id="solution-modal-title" className="text-2xl md:text-3xl font-bold text-on-surface">{data.title}</h2>
                        </div>
                    </div>
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
                
                <div className="flex-grow overflow-y-auto px-5 md:px-8 pb-40 sm:pb-24 modal-scroll-content">
                    <div className="prose prose-lg max-w-none text-on-surface-variant pt-6 space-y-4">
                        {data.longDescription.map((p: string, i: number) => <p key={i}>{p}</p>)}
                    </div>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4 text-on-surface">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {data.keyFeatures.map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle size={18} className={colors.text} />
                                <span className="text-on-surface-variant">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-on-surface">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.techStack.map((tech: string) => (
                            <span key={tech} className="px-3 py-1 text-sm font-medium bg-surface-container-high rounded-full text-on-surface-variant">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <footer className="absolute bottom-0 left-0 right-0 bg-surface-container-high p-4 border-t border-outline-variant rounded-b-3xl elevation-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={handleScrollToWork} variant="outlined" className="w-full justify-center py-3">
                           Explore Related Work
                        </Button>
                        <Button onClick={handleStartProject} variant="primary" className="w-full justify-center py-3">
                            Start a Project <ArrowRight className="ml-2" size={16} />
                        </Button>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default SolutionModal;