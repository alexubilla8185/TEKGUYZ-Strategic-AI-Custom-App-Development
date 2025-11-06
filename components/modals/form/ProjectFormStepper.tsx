import React, { useState, useEffect, useRef } from 'react';
// FIX: Import Variants type to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Send, Loader2, Sparkles, Mail, Calendar, Rocket, CheckCircle2 } from 'lucide-react';
import { useFormStore } from '../../../store/formStore';
import { useGlobalStore } from '../../../store/globalStore';
import { formStepsData } from '../../../data/formStepsData';
import { TextInput, SelectInput, TextareaInput, RadioChipGroup, CheckboxChipGroup } from './FormFields';
import Button from '../../common/Button';
import { FORM_STEP_TRANSITION, usePrefersReducedMotion, SIMPLE_FADE } from '../../../utils/motion';

const ProgressIndicator = () => {
    const { currentStep, totalSteps } = useFormStore();
    const currentStepConfig = formStepsData[currentStep - 1];
    const prefersReducedMotion = usePrefersReducedMotion();
    
    // On the success step (step 5), we don't show the indicator.
    if (currentStep === totalSteps) {
        return null;
    }

    const stepTitle = `Step ${currentStep} of ${totalSteps - 1}: ${currentStepConfig?.title || 'Confirmation'}`;

    return (
        <header className="sticky top-0 bg-surface z-10 px-6 md:px-8 py-4 border-b border-outline-variant">
            <div className="flex justify-center items-center gap-2 md:gap-4" aria-label="Form progress">
                {Array.from({ length: totalSteps - 1 }).map((_, i) => {
                    const stepNum = i + 1;
                    const isActive = stepNum === currentStep;
                    const isCompleted = stepNum < currentStep;

                    return (
                        <React.Fragment key={stepNum}>
                            <motion.div
                                className="relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border-2 transition-colors duration-300"
                                transition={{ duration: 0.3 }}
                                aria-current={isActive ? "step" : undefined}
                                animate={prefersReducedMotion ? {
                                    borderColor: isCompleted || isActive ? 'var(--primary-50)' : 'var(--outline-variant)',
                                    backgroundColor: isCompleted ? 'var(--primary-50)' : (isActive ? 'var(--primary-10)' : 'var(--surface-container-low)'),
                                } : {
                                    scale: isCompleted ? [1, 1.15, 1] : isActive ? 1.1 : 1,
                                    borderColor: isCompleted || isActive ? 'var(--primary-50)' : 'var(--outline-variant)',
                                    backgroundColor: isCompleted ? 'var(--primary-50)' : (isActive ? 'var(--primary-10)' : 'var(--surface-container-low)'),
                                }}
                            >
                               <AnimatePresence initial={false} mode="wait">
                                    {isCompleted ? (
                                        <motion.div
                                            key="check"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
                                            className="flex items-center justify-center"
                                        >
                                            <Check size={18} className="text-white" />
                                        </motion.div>
                                    ) : (
                                        <motion.span
                                            key="number"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                                            className={`font-medium ${isActive ? 'text-primary-50' : 'text-on-surface-variant'}`}
                                        >
                                            {stepNum}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            {stepNum < totalSteps -1 && (
                                <div className="flex-1 h-0.5 bg-outline-variant relative" aria-hidden="true">
                                    <motion.div 
                                        className="absolute top-0 left-0 h-full bg-primary-50"
                                        initial={{width: '0%'}}
                                        animate={{width: isCompleted ? '100%' : '0%'}}
                                        transition={{duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut'}}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
            <p className="text-center text-sm text-on-surface-variant mt-3 font-medium">
                {stepTitle}
            </p>
        </header>
    );
};

const AIPrefillBanner = () => {
    const { isPrefilledFromChat } = useFormStore();
    const { activeModel } = useGlobalStore();
    const prefersReducedMotion = usePrefersReducedMotion();

    if (!isPrefilledFromChat) return null;

    return (
        <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
            className="bg-tertiary-10 border-b border-tertiary-90 p-4 flex items-center gap-3 text-tertiary-40"
        >
            <Sparkles size={20} className="text-tertiary-40 flex-shrink-0"/>
            <div>
                <p className="font-medium text-sm">Pre-filled from your conversation with {activeModel === 'gemini' ? 'Gemini' : 'Grok'}</p>
                <p className="text-xs opacity-80">Review and edit as needed</p>
            </div>
        </motion.div>
    );
};

const SuccessStep = () => {
     const { setActiveModal } = useGlobalStore.getState();
     const prefersReducedMotion = usePrefersReducedMotion();
     const handleClose = () => {
        setActiveModal(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
     };
    
    return (
        <div role="status" aria-live="polite" className="text-center p-6 md:p-8 flex flex-col items-center justify-center h-full bg-gradient-to-b from-primary-10/50 to-surface">
            <motion.div
                initial={{ scale: 0 }}
                animate={prefersReducedMotion ? { scale: 1 } : { scale: [0, 1.2, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 0.5, ease: 'backOut' }}
            >
                <CheckCircle2 size={80} className="text-primary-50" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mt-6">We've received your project!</h2>
            <p className="text-lg text-on-surface-variant mt-2 mb-8 max-w-md">We'll review your details and get back to you within 24 hours.</p>

            <div className="bg-surface-container-low p-6 rounded-2xl w-full max-w-sm text-left">
                <h3 className="font-bold text-on-surface mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3"><Mail size={20} className="text-primary-50"/><span className="text-on-surface-variant">Check your email for confirmation</span></div>
                    <div className="flex items-center gap-3"><Calendar size={20} className="text-primary-50"/><span className="text-on-surface-variant">We'll schedule a discovery call</span></div>
                    <div className="flex items-center gap-3"><Rocket size={20} className="text-primary-50"/><span className="text-on-surface-variant">Start building your solution</span></div>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 w-full max-w-sm">
                <Button as="a" href="https://calendly.com/" target="_blank" rel="noopener noreferrer" variant="primary" className="w-full h-12">
                    Schedule Discovery Call
                </Button>
                <Button variant="text" onClick={handleClose} className="w-full h-12">Back to Home</Button>
            </div>
        </div>
    );
}

const ProjectFormStepper: React.FC = () => {
    const { currentStep, nextStep, prevStep, handleSubmit, isSubmitting, submitSuccess, totalSteps, validateStep, errors } = useFormStore();
    const [direction, setDirection] = useState(1);
    const [liveRegionText, setLiveRegionText] = useState('');
    const stepContentRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const prevIsSubmitting = useRef(isSubmitting);
    
    const isFinalStep = currentStep === totalSteps - 1;
    const currentStepConfig = formStepsData[currentStep - 1];

    // Live region for screen readers
    useEffect(() => {
        if (currentStepConfig) {
            const newTitle = `Now on step ${currentStep} of ${totalSteps - 1}: ${currentStepConfig.title}`;
            setLiveRegionText(newTitle);
        } else if (submitSuccess) {
            setLiveRegionText("Project submission successful.");
        }
    }, [currentStep, submitSuccess, currentStepConfig, totalSteps]);
    
    // Focus management for accessibility
    useEffect(() => {
        if (submitSuccess) return;
        const timer = setTimeout(() => {
            const formNode = stepContentRef.current;
            if (!formNode) return;
            // Focus the h2 title of the step for context
            const heading = formNode.querySelector('h2');
            if(heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus();
            }
        }, 350); // Delay slightly longer than animation
        return () => clearTimeout(timer);
    }, [currentStep, submitSuccess]);

    // Focus on first error after failed submission
    useEffect(() => {
        if (prevIsSubmitting.current && !isSubmitting && Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0];
            const firstErrorField = document.getElementById(firstErrorKey) || document.getElementsByName(firstErrorKey)[0];
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
        prevIsSubmitting.current = isSubmitting;
    }, [isSubmitting, errors]);

    const handleNext = () => {
        if (validateStep(currentStep - 1)) {
            setDirection(1);
            nextStep();
        } else {
             setTimeout(() => {
                const firstErrorField = document.querySelector('[aria-invalid="true"], [aria-describedby*="error"]');
                if (firstErrorField) {
                    (firstErrorField as HTMLElement).focus();
                }
            }, 100);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        prevStep();
    };

    if (submitSuccess) {
        return <SuccessStep />;
    }

    // FIX: Explicitly type the variants object to resolve type inference issues.
    const stepTransitionVariants: Variants = prefersReducedMotion ? SIMPLE_FADE : FORM_STEP_TRANSITION;

    return (
        <form onSubmit={(e) => { e.preventDefault(); if (isFinalStep) handleSubmit(); else handleNext() }} className="flex flex-col h-full bg-surface">
            <ProgressIndicator />
            <AIPrefillBanner />
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {liveRegionText}
            </div>

            <div className="flex-grow overflow-y-auto modal-scroll-content min-h-[400px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        ref={stepContentRef}
                        key={currentStep}
                        custom={direction}
                        variants={stepTransitionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-6 md:px-8 py-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-6">{currentStepConfig.title}</h2>
                        <div className="space-y-6">
                            {currentStepConfig.fields.map(field => {
                                switch(field.type) {
                                    case 'radio-chip': return <RadioChipGroup key={field.name} field={field} />;
                                    case 'checkbox-chip': return <CheckboxChipGroup key={field.name} field={field} />;
                                    case 'select': return <SelectInput key={field.name} field={field} />;
                                    case 'textarea': return <TextareaInput key={field.name} field={field} />;
                                    default: return <TextInput key={field.name} field={field} />;
                                }
                            })}
                        </div>
                        {isFinalStep && (
                             <p className="text-xs text-on-surface-variant mt-8">
                                By submitting, you agree to our <a href="#/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-50 font-medium underline hover:no-underline">Privacy Policy</a>. We'll only use your information to discuss your project.
                            </p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <footer className="sticky bottom-0 bg-surface-container-high p-4 md:p-5 border-t border-outline-variant z-10">
                <div className="flex justify-between items-center">
                    <Button type="button" variant="text" onClick={handleBack} className={currentStep === 1 ? 'invisible' : 'visible'}>
                        <ArrowLeft size={20} className="mr-2" />
                        Back
                    </Button>
                    {isFinalStep ? (
                        <Button type="submit" variant="primary" disabled={isSubmitting} className="min-w-[160px]">
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Project
                                    <Send size={18} className="ml-2" />
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button type="button" variant="primary" onClick={handleNext} className="min-w-[160px]">
                            Next
                            <ArrowRight size={20} className="ml-2" />
                        </Button>
                    )}
                </div>
            </footer>
        </form>
    );
};

export default ProjectFormStepper;