



import React, { useEffect, useRef, useCallback } from 'react';
// FIX: Import Variants type to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { X, ArrowRight, Award } from 'lucide-react';
import { useGlobalStore } from '../../store/globalStore';
import { useFormStore } from '../../store/formStore';
import { usePrefersReducedMotion, SCALE_SLIDE_FADE, SIMPLE_FADE, makeMotionStyles } from '../../utils/motion';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import Button from '../common/Button';
import { CaseStudy } from '../../types';
import CountUp from '../common/CountUp';

const TiltedMetricCard: React.FC<{ metric: CaseStudy['metrics'][number] }> = ({ metric }) => {
    const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect();
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <div style={{ perspective: '1000px' }}>
            <motion.div
                ref={ref}
                // FIX: Pass the entire style object from the hook. Motion values like rotateX/Y cannot be props.
                style={makeMotionStyles(style)}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                className="bg-primary-10 p-4 rounded-2xl text-center transition-transform duration-200 h-full"
            >
                <p className="text-4xl md:text-5xl font-bold text-primary-50 tracking-tighter">
                    <CountUp to={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </p>
                <p className="text-xs text-on-surface-variant mt-1">{metric.label}</p>
            </motion.div>
        </div>
    );
};

const CaseStudyModal: React.FC = () => {
    const { activeModalData, setActiveModal } = useGlobalStore();
    const { initializePrefill } = useFormStore();
    const data = activeModalData as CaseStudy;
    const modalRef = useRef<HTMLDivElement>(null);

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleClose = useCallback(() => setActiveModal(null), [setActiveModal]);
    
    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleClose]);
    
    // Handle focus trap
    useEffect(() => {
        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = modalNode.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement) {
           firstElement.focus();
        }

        const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
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
            }
        };
        
        modalNode.addEventListener('keydown', handleTabKeyPress);
        return () => modalNode.removeEventListener('keydown', handleTabKeyPress);

    }, [data]);

    if (!data) return null;

    // FIX: Define easing curves as explicit tuples and type the variants object.
    const easeOut: [number, number, number, number] = [0.4, 0.0, 0.2, 1];
    const easeIn: [number, number, number, number] = [0.4, 0.0, 1, 1];
    const mobileSlideVariants: Variants = {
        hidden: { y: '100%' },
        visible: { 
            y: 0,
            transition: { duration: 0.5, ease: easeOut }
        },
        exit: {
            y: '100%',
            transition: { duration: 0.4, ease: easeIn }
        }
    };
    
    const modalVariants = prefersReducedMotion 
        ? SIMPLE_FADE 
        : (isMobile ? mobileSlideVariants : SCALE_SLIDE_FADE);


    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: prefersReducedMotion ? 0.1 : 0.5 } },
        exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0.1 : 0.4 } },
    };
    
    const colorMap = {
        primary: { border: 'border-primary-40', text: 'text-primary-50', bg: 'bg-primary-10' },
        error: { border: 'border-error', text: 'text-error', bg: 'bg-error/5' },
        warning: { border: 'border-warning', text: 'text-warning', bg: 'bg-warning/10' },
        success: { border: 'border-success', text: 'text-success', bg: 'bg-success/10' },
    };
    const colors = colorMap[data.badgeColor];

    const handleStartProject = () => {
        handleClose();
        setTimeout(() => {
            initializePrefill({ description: `Interested in a solution like the "${data.title}" project.` });
            setActiveModal('project-form');
        }, 200);
    };
    
    const Section: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({ title, children, className}) => (
        <div className={className}>
            <h2 className="text-2xl font-bold mb-4 text-on-surface">{title}</h2>
            <div className="space-y-4 text-base text-on-surface-variant leading-relaxed">
                {children}
            </div>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 z-[5000] flex justify-center items-center md:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-modal-title"
        >
            <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/80"
                onClick={handleClose}
            />
            
            <motion.div
                ref={modalRef}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-surface elevation-5 w-full h-full md:w-full md:h-full md:max-w-[960px] md:max-h-[90vh] md:rounded-[28px] flex flex-col overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Header */}
                 <header className="flex-shrink-0 p-5 md:p-8 flex justify-between items-start border-b border-outline-variant">
                    <div className="flex items-center gap-4">
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors.bg}`}>
                            <Award size={36} className={colors.text} />
                        </div>
                        <div>
                            <h1 id="case-study-modal-title" className="text-2xl md:text-3xl font-bold text-on-surface">{data.title}</h1>
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
                
                {/* Content */}
                <div className="flex-grow overflow-y-auto modal-scroll-content">
                    <div className="max-w-[800px] mx-auto px-5 md:px-8 pt-8 pb-32">
                        {/* Metrics */}
                        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            {data.metrics.map(metric => (
                                <TiltedMetricCard key={metric.label} metric={metric} />
                            ))}
                        </motion.div>
                        
                        <div className="space-y-8">
                            <Section title="Project Overview">
                                {data.overview.map((p, i) => <p key={i}>{p}</p>)}
                            </Section>

                            <div className={`p-5 rounded-lg border-l-4 border-error ${colors.bg}`}>
                                 <Section title="The Challenge" className="text-error">
                                    {data.challenge.map((p, i) => <p key={i}>{p}</p>)}
                                </Section>
                            </div>

                            <div className={`p-5 rounded-lg border-l-4 ${colors.border} ${colors.bg}`}>
                                <Section title="Our Solution" className={colors.text}>
                                    {data.solution.map((p, i) => <p key={i}>{p}</p>)}
                                </Section>
                            </div>

                            <div className="p-5 rounded-lg bg-gradient-to-br from-primary-10 to-surface-container border border-primary-40/50">
                                <Section title="Results & Impact" className={colors.text}>
                                    {data.results.summary.map((p, i) => <p key={i}>{p}</p>)}
                                </Section>
                            </div>

                             {/* Tech Stack */}
                            <Section title="Technology Stack">
                                <div className="flex flex-wrap gap-3">
                                    {data.techStack.map(tech => (
                                        <div key={tech} className="bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant hover:border-primary-50 hover:scale-105 transition-all duration-200">
                                            <p className="font-medium text-sm text-on-surface-variant">{tech}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <footer className="absolute bottom-0 left-0 right-0 bg-surface-container-high p-4 border-t border-outline-variant rounded-b-[28px] elevation-4">
                    <div className="flex justify-center">
                        <Button onClick={handleStartProject} variant="primary" className="min-w-[240px] h-12 px-6 text-base">
                            Start Your Project
                            <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default CaseStudyModal;