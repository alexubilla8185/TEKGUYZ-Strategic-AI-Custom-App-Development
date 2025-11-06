





import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, animate, useInView, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { 
    ArrowRight, ChevronDown, Compass, Layers, Code2, Rocket, TrendingUp, CheckCircle2,
    Target, MessageCircle, Lightbulb, Users, Award, Shield, Brain, Globe, Smartphone,
    Plug, Cloud, BarChart, Workflow, RefreshCw
} from 'lucide-react';
import { useGlobalStore } from '../store/globalStore';
import { useFormStore } from '../store/formStore';
import { usePrefersReducedMotion, FADE_UP, FADE_UP_STAGGER_CONTAINER, FADE_UP_STAGGER_CHILD, SIMPLE_FADE, SIMPLE_STAGGER_CONTAINER, SIMPLE_STAGGER_CHILD, makeMotionStyles } from '../utils/motion';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { useRipple } from '../hooks/useRipple';
import Logomark from '../components/branding/Logomark';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { solutionsData } from '../data/solutionsData';
import { featuredCaseStudies, additionalProjects } from '../data/workData';
import { CaseStudy, AdditionalProject } from '../types';
import { LucideIcon } from 'lucide-react';
import CountUp from '../components/common/CountUp';

// --- Data for Process Section ---
interface ProcessPhase {
  phase: number;
  title: string;
  subtitle: string;
  duration: string;
  accentColor: string;
  icon: LucideIcon;
  deliverables: string[];
  outcome: string;
}

const processData: ProcessPhase[] = [
  {
    phase: 1,
    title: 'Discovery & Strategy',
    subtitle: 'Align vision with technical reality',
    duration: '2-3 weeks',
    accentColor: '#4285F4',
    icon: Compass,
    deliverables: [
      'Requirements Gathering',
      'Market Analysis',
      'Technical Feasibility',
      'Stakeholder Workshops',
    ],
    outcome: 'A comprehensive strategy document that aligns business goals with technical capabilities, approved by all stakeholders.',
  },
  {
    phase: 2,
    title: 'Solution Architecture',
    subtitle: 'Design scalable, future-proof foundations',
    duration: '3-4 weeks',
    accentColor: '#9334E9',
    icon: Layers,
    deliverables: [
      'System Design',
      'Technology Selection',
      'Scalability Planning',
      'Roadmap Creation',
    ],
    outcome: 'Detailed technical blueprints that serve as the single source of truth for the entire development lifecycle.',
  },
  {
    phase: 3,
    title: 'Development & Integration',
    subtitle: 'Build with precision, test relentlessly',
    duration: '8-16 weeks',
    accentColor: '#0F9D58',
    icon: Code2,
    deliverables: [
      'Agile Development Sprints',
      'API Integration',
      'Quality Assurance',
      'Continuous Integration',
    ],
    outcome: 'A fully functional solution, tested, and integrated with your systems.',
  },
  {
    phase: 4,
    title: 'Deployment & Training',
    subtitle: 'Launch smoothly, empower your team',
    duration: '2-3 weeks',
    accentColor: '#F29900',
    icon: Rocket,
    deliverables: [
      'Production Deployment',
      'User Training & Onboarding',
      'Documentation',
      'Go-Live Support',
    ],
    outcome: 'A live system with confident, trained users and 24/7 monitoring to ensure stability during critical early days.',
  },
  {
    phase: 5,
    title: 'Optimization & Scale',
    subtitle: 'Refine, scale, and maximize ROI',
    duration: 'Ongoing',
    accentColor: '#EA4335',
    icon: TrendingUp,
    deliverables: [
      'Performance Monitoring',
      'Continuous Improvement',
      'Feature Expansion',
      'Ongoing Support',
    ],
    outcome: 'Continuous improvement cycles that adapt to user needs, market changes, and emerging opportunities.',
  },
];

// --- About Section Components & Data ---

const AnimatedMetricCard: React.FC<{ value: number; label: string; suffix?: string; }> = ({ value, label, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const prefersReducedMotion = usePrefersReducedMotion();
    const fullLabel = `${value}${suffix || ''} ${label}`;

    return (
        <div ref={ref} className="group" aria-label={fullLabel}>
            <p className="text-[45px] font-bold text-primary-50 mb-2" style={{fontWeight: 700}}>
                {(isInView && !prefersReducedMotion) ? <CountUp to={value} suffix={suffix} duration={1.2} /> : `${value}${suffix || ''}`}
            </p>
            <p className="text-lg text-on-surface-variant leading-tight" style={{lineHeight: 1.3}}>{label}</p>
        </div>
    );
};

const AboutSection = () => {
    const handleStartProject = () => {
        useFormStore.getState().resetForm();
        useGlobalStore.getState().setActiveModal('project-form');
    };
    const prefersReducedMotion = usePrefersReducedMotion();
    
    const coreValues = [
        { text: 'Results-Driven', icon: Target },
        { text: 'Transparent Communication', icon: MessageCircle },
        { text: 'Continuous Innovation', icon: Lightbulb },
        { text: 'Client Empowerment', icon: Users },
        { text: 'Technical Excellence', icon: Award },
        { text: 'Ethical AI', icon: Shield },
    ];
    
    const techDomains = [
        { text: 'AI & Machine Learning', icon: Brain },
        { text: 'Custom Web Applications', icon: Globe },
        { text: 'Mobile Development', icon: Smartphone },
        { text: 'API Development & Integration', icon: Plug },
        { text: 'Cloud Infrastructure', icon: Cloud },
        { text: 'Data Analytics & Visualization', icon: BarChart },
        { text: 'Workflow Automation', icon: Workflow },
        { text: 'Legacy System Modernization', icon: RefreshCw },
    ];
    
    return (
        <section id="about" className="bg-surface py-16 md:py-[100px]">
            <div className="container max-w-[1440px]">
                {/* Section Header */}
                <motion.header
                    variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    className={`text-left mb-10 lg:mb-16 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                >
                    <p className="text-sm font-medium text-primary-50 tracking-[1.2px] mb-2">ABOUT US</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-on-surface">Intelligence Meets Experience</h2>
                    <p className="text-lg md:text-xl text-on-surface-variant max-w-[700px] mt-4">
                        A team of senior technologists who translate complex problems into elegant, measurable solutions.
                    </p>
                </motion.header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 lg:grid-cols-[58fr_42fr] lg:gap-20">
                    {/* Left Column: The Story */}
                    <motion.div
                        variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                        className={`lg:col-start-1 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-on-surface mb-3">Our Philosophy</h3>
                            <div className="space-y-5 text-lg text-on-surface max-w-[540px]" style={{lineHeight: 1.7}}>
                                <p>At TEKGUYZ, we believe that technology should be an enabler of ambition, not a barrier. Our philosophy is rooted in a deep understanding of your business challenges, allowing us to craft bespoke technology solutions that are not only powerful and scalable but also intuitive and impactful.</p>
                                <p>We foster a culture of relentless curiosity and collaborative problem-solving, ensuring that we remain at the forefront of technological innovation to deliver tangible results.</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">What Drives Us</h3>
                            <motion.div
                                variants={prefersReducedMotion ? SIMPLE_STAGGER_CONTAINER : FADE_UP_STAGGER_CONTAINER}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                                className={`flex flex-wrap gap-3 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                                role="list"
                            >
                                {coreValues.map(value => (
                                    <motion.div key={value.text} role="listitem" variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD} className="flex items-center gap-2 border-[1.5px] border-outline-variant bg-transparent rounded-[20px] px-[18px] py-2.5 hover:border-primary-50 hover:bg-primary-50/10 transition-colors duration-200">
                                        <value.icon size={16} className="text-on-surface" />
                                        <span className="text-sm font-medium text-on-surface">{value.text}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column: The Expertise */}
                    <div className="lg:col-start-2 mt-12 lg:mt-0">
                        <motion.div
                            variants={prefersReducedMotion ? SIMPLE_STAGGER_CONTAINER : FADE_UP_STAGGER_CONTAINER}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                            className={`grid grid-cols-2 gap-x-6 gap-y-8 md:gap-8 mb-12 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                        >
                           <motion.div variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}><AnimatedMetricCard value={15} suffix="+" label="Years Combined Experience" /></motion.div>
                            <motion.div variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}><AnimatedMetricCard value={50} suffix="+" label="Projects Delivered" /></motion.div>
                            <motion.div variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}><AnimatedMetricCard value={98} suffix="%" label="Client Satisfaction Rate" /></motion.div>
                            <motion.div variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}><AnimatedMetricCard value={12} label="Industries Served" /></motion.div>
                        </motion.div>
                        <motion.div
                             variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                             initial="hidden"
                             whileInView="visible"
                             viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                             className={`mt-12 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                        >
                            <h3 className="text-xl font-semibold mb-5">Technical Expertise</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {techDomains.map(domain => (
                                    <div key={domain.text} className="flex items-center gap-3 group">
                                        <domain.icon size={20} className="text-primary-50 flex-shrink-0 group-hover:scale-110 transition-transform duration-150 ease-in-out"/>
                                        <span className="text-lg text-on-surface group-hover:text-primary-50 transition-colors duration-150 ease-in-out">{domain.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- Process Section Components ---

const PhaseCard: React.FC<{ phase: ProcessPhase; index: number; onInView: () => void; }> = ({ phase, index, onInView }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.5 });
    const prefersReducedMotion = usePrefersReducedMotion();
    const isReversed = index % 2 !== 0;

    const { ref: tiltRef, style: tiltStyle, onMouseMove, onMouseLeave } = useTiltEffect();

    useEffect(() => {
        if (isInView && !prefersReducedMotion) {
            onInView();
        }
    }, [isInView, onInView, prefersReducedMotion]);

    const deliverablesVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
    };

    const deliverableItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };
    
    const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
    const layout = isMobile ? 'mobile' : (isReversed ? 'desktop-reversed' : 'desktop');

    const badgeAnimation = prefersReducedMotion ? {
        scale: 1,
        rotate: 0,
    } : {
        scale: [0, 1.2, 0.95, 1],
        rotate: [0, 360],
        boxShadow: [
            '0 8px 24px rgba(66, 133, 244, 0.0)',
            '0 8px 48px rgba(66, 133, 244, 0.3)',
            '0 8px 24px rgba(66, 133, 244, 0.15)',
        ]
    };
    
    return (
        <article ref={cardRef} className={`grid grid-cols-1 lg:grid-cols-[80px_1fr_80px] lg:gap-x-8 items-start relative rounded-lg`}>
            {/* --- BADGE --- */}
            <div className={`flex justify-center lg:block ${layout === 'desktop-reversed' ? 'lg:col-start-3' : 'lg:col-start-1'}`}>
                <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={isInView ? badgeAnimation : {}}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: (prefersReducedMotion ? 0 : index * 0.15) }}
                    className="relative w-24 h-24 rounded-full flex items-center justify-center z-[2] border-4 border-primary-40"
                    style={{
                        background: 'radial-gradient(circle, var(--surface-container) 0%, var(--surface-container-high) 100%)',
                    }}
                >
                    <span className="text-[48px] font-bold text-primary-50" style={{fontWeight: 700}}>{phase.phase}</span>
                </motion.div>
            </div>
            
            {/* --- CONTENT CARD --- */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (prefersReducedMotion ? 0 : 0.2) }}
                className={`w-full mt-6 lg:mt-0 ${layout === 'desktop-reversed' ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-2'}`}
            >
                <div style={{ perspective: '1000px' }}>
                    <motion.div 
                        ref={tiltRef}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                        className="group relative bg-surface-container/60 supports-backdrop-blur:backdrop-blur-md border border-outline-variant rounded-3xl p-6 md:p-8 elevation-1 hover:elevation-2 transition-all duration-300 ease-out"
                        style={makeMotionStyles({...tiltStyle, '--accent-color': phase.accentColor })}
                    >
                        <div className="absolute inset-0 bg-primary-50/0 group-hover:bg-primary-50/[.08] rounded-3xl transition-colors duration-300 pointer-events-none" />

                        <div className="absolute top-0 bottom-0 left-0 w-[6px] rounded-l-3xl bg-[var(--accent-color)] group-hover:w-3 transition-all duration-200" style={{boxShadow: `0 0 12px var(--accent-color)`}}/>
                        <motion.div
                            className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${phase.accentColor}1A`}}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <phase.icon size={28} style={{ color: phase.accentColor }}/>
                        </motion.div>

                        <h3 className="text-3xl lg:text-[36px] font-bold text-on-surface mb-2 pr-16">{phase.title}</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <p className="text-base text-on-surface-variant">{phase.subtitle}</p>
                            <motion.span 
                                animate={isInView && !prefersReducedMotion ? {scale: [1, 1.1, 1]} : {}}
                                transition={{duration: 0.5, repeat: Infinity, repeatType: 'mirror', delay: 1}}
                                className="text-xs font-medium bg-surface-container-high text-on-surface-variant inline-block px-3 py-1 rounded-full whitespace-nowrap"
                            >
                                {phase.duration}
                            </motion.span>
                        </div>

                        <h4 className="text-xl font-semibold text-on-surface mb-4">Key Deliverables</h4>
                        <motion.ul
                            variants={deliverablesVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="space-y-4"
                        >
                            {phase.deliverables.map((item, i) => (
                                <motion.li key={i} variants={deliverableItemVariants} className="flex items-start gap-3 group/item">
                                    <CheckCircle2 size={20} className="text-primary-50 mt-1 flex-shrink-0 group-hover/item:scale-125 group-hover/item:rotate-[15deg] transition-transform duration-200"/>
                                    <span className="text-on-surface text-base leading-relaxed" style={{lineHeight: 1.6}}>{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="w-full h-px bg-outline-variant my-6" />

                        <div>
                            <p className="text-sm font-semibold text-primary-50">What you get:</p>
                            <p className="text-on-surface-variant mt-1 text-base">{phase.outcome}</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </article>
    );
};

const ProcessSection = () => {
    const { setActiveModal } = useGlobalStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // State for progress indicator
    const [activePhase, setActivePhase] = useState(1);
    const updateActivePhase = useCallback((phase: number) => {
        setActivePhase(prev => Math.max(prev, phase));
    }, []);

    // Timeline line animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const glowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
    
    const handleStartProject = () => {
        useFormStore.getState().resetForm();
        useGlobalStore.getState().setActiveModal('project-form');
    };

    return (
        <section id="process" className="py-16 md:py-32 bg-gradient-to-b from-surface to-surface-container-low overflow-visible">
            <div className="container max-w-[1200px]">
                <motion.div
                    variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    className={`text-center mb-12 lg:mb-20 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-[57px] font-bold">From Vision to Reality</h2>
                    <p className="text-lg md:text-xl text-on-surface-variant max-w-[700px] mx-auto mt-4">
                        Our battle-tested five-phase methodology transforms complex challenges into elegant solutions.
                    </p>
                    <motion.div
                        className={`h-1 w-[120px] bg-gradient-to-r from-primary-50 to-error mx-auto mt-6 rounded-full ${!prefersReducedMotion ? '[will-change:transform]' : ''}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
                        style={{ transformOrigin: 'center' }}
                    />
                </motion.div>
                
                {/* Progress Indicator - Desktop */}
                <div className="hidden lg:flex justify-center mb-16">
                    <div className="flex items-center gap-2 p-1 rounded-full bg-surface-container border border-outline-variant" role="tablist" aria-label="Process Phases">
                        {processData.map(p => (
                            <div key={p.phase} className="relative px-5 py-2 text-center" role="tab" aria-selected={activePhase >= p.phase}>
                                 <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${activePhase >= p.phase ? 'text-white' : 'text-on-surface-variant'}`}>
                                    {p.title.split(' & ')[0]}
                                </span>
                                {activePhase >= p.phase && (
                                     <motion.div 
                                        layoutId="progress-indicator"
                                        className="absolute inset-0 bg-gradient-to-r from-primary-40 to-primary-50 rounded-full"
                                        transition={{type: 'spring', stiffness: 300, damping: 30}}
                                     />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={containerRef} className="relative">
                    {/* --- DESKTOP TIMELINE VISUAL --- */}
                    <div ref={timelineRef} className="absolute top-12 bottom-12 left-[40px] w-[3px] hidden lg:block z-[1]" aria-hidden="true">
                        <motion.div
                            className="absolute top-0 left-0 h-full w-full rounded-full"
                            style={{
                                // FIX: Motion values like opacity must be passed to the `style` prop.
                                opacity: prefersReducedMotion ? 1 : lineOpacity,
                                height: prefersReducedMotion ? '100%' : lineHeight,
                                background: 'linear-gradient(to bottom, var(--primary-40) 0%, var(--primary-50) 50%, var(--primary-40) 100%)',
                            }}
                            transition={{ height: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }, opacity: { duration: 0.6 } }}
                        />
                        <motion.div 
                            className="absolute -inset-4"
                            // FIX: Motion values like opacity must be passed to the `style` prop.
                            style={{ 
                                opacity: prefersReducedMotion ? 0 : glowOpacity,
                                boxShadow: '0 0 20px var(--primary-40)'
                            }}
                        />
                         {/* Connector Nodes */}
                        {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
                           <motion.div
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-50 rounded-full"
                            // FIX: Motion values like scale must be passed to the `style` prop.
                            style={{ 
                                scale: prefersReducedMotion ? 1 : useTransform(scrollYProgress, [pos - 0.05, pos], [0, 1]),
                                top: `${pos * 100}%`,
                            }}
                           />
                        ))}
                    </div>

                    {/* --- PHASES --- */}
                    <div className="relative z-[2] flex flex-col gap-16 lg:gap-32">
                        {processData.map((phase, index) => (
                            <PhaseCard
                                key={phase.phase}
                                phase={phase}
                                index={index}
                                onInView={() => updateActivePhase(phase.phase)}
                            />
                        ))}
                    </div>
                </div>

                 {/* Closing CTA */}
                 <motion.div
                    variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    className={`mt-20 lg:mt-24 max-w-[600px] mx-auto text-center bg-surface-container p-8 md:p-12 rounded-3xl ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                 >
                    <h3 className="text-2xl md:text-3xl font-bold">Ready to start your transformation?</h3>
                    <p className="text-base md:text-lg text-on-surface-variant mt-3 mb-6">
                        Let's discuss how our proven process applies to your unique challenge.
                    </p>
                    <Button onClick={handleStartProject} variant="primary" className="px-8 py-4 text-base">
                        Schedule a Discovery Call
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

// --- START OF NEW HERO SECTION ---

const AnimatedHeroShapes = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
        return null;
    }

    const shapes = [
        { size: 250, top: '10%', left: '5%', duration: 20 },
        { size: 300, top: '60%', left: '85%', duration: 30 },
        { size: 120, top: '75%', left: '15%', duration: 25 },
        { size: 80, top: '25%', left: '90%', duration: 18 },
        { size: 100, top: '50%', left: '45%', duration: 22 },
    ];

    return (
        <div className="absolute inset-0 z-[-1] hidden lg:block" aria-hidden="true">
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className="absolute bg-primary-40/5 rounded-full"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        top: shape.top,
                        left: shape.left,
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        x: [0, 20, -20, 0],
                        y: [0, -30, 30, 0],
                    }}
                    transition={{
                        duration: shape.duration,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'mirror',
                    }}
                />
            ))}
        </div>
    );
};

const HeroSection: React.FC = () => {
    const { setActiveModal, toggleChat } = useGlobalStore();
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleScrollToWork = () => {
        const element = document.querySelector('#work');
        if (element) {
            const yOffset = -80; // Header height offset
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    
    const handleStartProject = () => {
        useFormStore.getState().resetForm();
        useGlobalStore.getState().setActiveModal('project-form');
    };

    const metrics = [
        { value: 50, suffix: '+', label: "Projects Delivered" },
        { value: 98, suffix: '%', label: "Client Satisfaction" },
        { value: 15, suffix: '+', label: "Years Experience" },
    ];
    
    // FIX: Define cubic-bezier easing arrays with explicit tuple types to satisfy framer-motion's Transition type.
    const customEase: [number, number, number, number] = [0.4, 0.0, 0.2, 1];
    const ctaEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

    // Animation Variants for the coordinated sequence
    const headlineVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, y: 0,
            transition: { delay: 0.4, duration: 0.8, ease: customEase }
        }
    };

    const subheadlineVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, y: 0,
            transition: { delay: 0.6, duration: 0.8, ease: customEase }
        }
    };
    
    const ctaContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
    };

    const ctaChildVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1, scale: 1,
            transition: { duration: 0.5, ease: ctaEase }
        }
    };
    
    const metricsContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 1.0 } }
    };
    
    const metricsChildVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.4, ease: customEase }
        }
    };

    return (
        <section
            aria-label="Hero section"
            className="relative flex flex-col items-center justify-center min-h-screen px-6 lg:px-10 max-w-[1600px] mx-auto"
        >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--surface)_0%,_var(--primary-10)_100%)] opacity-60" />
            <AnimatedHeroShapes />
            
            <motion.div
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center text-center"
            >
                {/* Logomark */}
                <motion.div
                    className="mb-8"
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{
                        delay: 1.2,
                        rotate: { repeat: Infinity, duration: 60, ease: 'linear' }
                    }}
                >
                    <Logomark animate={true} size={useMediaQuery({ query: '(min-width: 1024px)' }) ? 120 : 100} />
                </motion.div>

                {/* Headline */}
                 <motion.h1
                    variants={prefersReducedMotion ? {} : headlineVariants}
                    className="font-bold text-on-surface max-w-[1000px] leading-[1.1] 
                    text-[40px] tracking-[-1px]
                    md:text-[52px] 
                    lg:text-[64px] lg:tracking-[-1.5px]
                    xl:text-[72px]"
                >
                    Intelligence, <span className="bg-gradient-to-r from-primary-50 to-primary-70 bg-clip-text text-transparent">Engineered.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={prefersReducedMotion ? {} : subheadlineVariants}
                    className="max-w-[700px] mx-auto leading-[1.5] text-on-surface-variant 
                    mt-5 mb-10 text-lg 
                    md:mt-6 md:mb-12 md:text-xl
                    lg:text-2xl"
                >
                    We build <strong className="font-medium text-primary-50">intelligent systems</strong> powered by <strong className="font-medium text-primary-50">cutting-edge AI</strong> that transform complex business challenges into measurable results.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div 
                    variants={prefersReducedMotion ? {} : ctaContainerVariants}
                    className="w-full max-w-[600px] flex flex-col md:flex-row justify-center gap-3 md:gap-4 mx-auto mb-12 md:mb-16"
                >
                    <motion.div variants={ctaChildVariants} className="w-full md:w-auto">
                        <Button onClick={handleStartProject} className="w-full md:min-w-[200px] h-14 md:h-16 rounded-2xl text-base font-semibold px-8 elevation-2 hover:elevation-3 hover:scale-103 hover:bg-primary-80 transition-all duration-250 ease-out">
                            Start Your Project <Rocket size={20} className="ml-2"/>
                        </Button>
                    </motion.div>
                    <motion.div variants={ctaChildVariants} className="w-full md:w-auto">
                        <Button onClick={handleScrollToWork} variant="outlined" className="w-full md:min-w-[200px] h-14 md:h-16 rounded-2xl text-base font-semibold px-8 !border-2 !border-primary-40 !text-primary hover:!bg-primary-10 hover:!border-primary hover:scale-102 transition-all duration-200 ease-out">
                            See Our Work <ArrowRight size={20} className="ml-2"/>
                        </Button>
                    </motion.div>
                     <motion.div variants={ctaChildVariants} className="w-full md:w-auto">
                        <Button onClick={() => toggleChat(true)} variant="text" className="w-full md:min-w-[200px] h-14 md:h-16 rounded-2xl text-base font-semibold px-8 !text-primary hover:!bg-surface-container hover:underline decoration-2 decoration-primary">
                            <MessageCircle size={20} className="mr-2"/> Chat with Our AI
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Metrics */}
                 <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-16 justify-center max-w-[900px] mx-auto mb-12 md:mb-20"
                    variants={prefersReducedMotion ? {} : metricsContainerVariants}
                 >
                    {metrics.map((metric) => (
                         <motion.div 
                            key={metric.label} 
                            className="text-center"
                            variants={metricsChildVariants}
                        >
                            <p className="font-bold text-primary-40 mb-2
                                text-4xl
                                md:text-[45px]
                                lg:text-[56px]">
                                <CountUp to={metric.value} suffix={metric.suffix} duration={1.2} />
                            </p>
                            <p className="text-sm text-on-surface-variant uppercase tracking-wide font-medium">{metric.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

// --- END OF NEW HERO SECTION ---

const WorkSection: React.FC = () => {
    const { setActiveModal } = useGlobalStore();
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleCardClick = (caseStudy: CaseStudy) => {
        setActiveModal('case-study-modal', caseStudy);
    };

    const handleKeyDown = (event: React.KeyboardEvent, caseStudy: CaseStudy) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(caseStudy);
        }
    };
    
    const WorkCard: React.FC<{ study: CaseStudy }> = ({ study }) => {
        const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect();
        const { addRipple, RippleElements } = useRipple<HTMLDivElement>({ duration: 600 });

        const handleCardClickWithRipple = (event: React.MouseEvent<HTMLDivElement>) => {
            addRipple(event);
            handleCardClick(study);
        };

        return (
            <div style={{ perspective: '1000px' }} className="h-full">
                <motion.div
                    ref={ref}
                    // FIX: Pass the style object from useTiltEffect directly to the style prop.
                    // Motion values like rotateX/rotateY cannot be passed as props.
                    style={makeMotionStyles(style)}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                    role="button"
                    tabIndex={0}
                    onClick={handleCardClickWithRipple}
                    onKeyDown={(e) => handleKeyDown(e, study)}
                    className="group relative bg-surface-container rounded-[24px] elevation-1 hover:elevation-2 transition-all duration-300 ease-out cursor-pointer flex flex-col min-w-[280px] h-full overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary-50/0 group-hover:bg-primary-50/[.08] rounded-[24px] transition-colors duration-300 pointer-events-none z-[1]" />
                    <div className="relative h-[280px] md:h-[320px] overflow-hidden rounded-t-[24px]">
                        <img src={study.imageUrl} alt={study.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out" />
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-surface-container-high/80 backdrop-blur-sm rounded-lg text-sm font-medium">
                            {study.badgeText}
                        </div>
                    </div>
                    <div className="p-6 bg-surface-container rounded-b-[24px] flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-on-surface mb-3">{study.title}</h3>
                        <p className="text-base text-on-surface-variant line-clamp-2 mb-4 flex-grow">{study.outcome}</p>
                        <div className="flex justify-end mt-auto pt-4">
                            <Button variant="text" className="px-4 py-2" tabIndex={-1}>
                                View Case Study
                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                    <RippleElements />
                </motion.div>
            </div>
        );
    };

    const AdditionalProjectCard: React.FC<{ project: AdditionalProject }> = ({ project }) => {
        const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect();
        const prefersReducedMotion = usePrefersReducedMotion();

        return (
            <div style={{ perspective: '1000px' }} className="h-full">
                <motion.div
                    ref={ref}
                    // FIX: Pass the style object from useTiltEffect directly to the style prop.
                    // Motion values like rotateX/rotateY cannot be passed as props.
                    style={makeMotionStyles(style)}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                    className="group relative bg-surface-container p-6 rounded-2xl border border-outline-variant elevation-1 hover:elevation-2 transition-all duration-300 ease-out text-left h-full flex flex-col"
                >
                    <div className="absolute inset-0 bg-primary-50/0 group-hover:bg-primary-50/[.08] rounded-2xl transition-colors duration-300 pointer-events-none" />
                    <h4 className="text-xl font-bold text-on-surface mb-2">{project.title}</h4>
                    <p className="text-base text-on-surface-variant flex-grow mb-6">{project.description}</p>
                    <div className="mt-auto pt-4 border-t border-outline-variant/80 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="text-xs font-bold text-primary-50 uppercase tracking-wider">Solution</span>
                            <p className="text-sm font-medium text-on-surface mt-1">{project.solution}</p>
                        </div>
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-surface-container-high rounded-full text-on-surface-variant">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    };


    return (
        <section id="work" className="bg-surface-container-low py-12 md:py-20 lg:py-24">
            <div className="container max-w-[1440px]">
                <motion.div
                    variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    className={`text-center mb-12 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                >
                    <h2 className="text-[45px] font-bold">Our Work</h2>
                    <p className="text-xl text-on-surface-variant mt-2">Real solutions. Measurable results.</p>
                </motion.div>

                {/* Featured Case Studies */}
                <motion.div
                    variants={prefersReducedMotion ? SIMPLE_STAGGER_CONTAINER : FADE_UP_STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                >
                    {featuredCaseStudies.map((study) => (
                        <motion.div key={study.id} variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}>
                            <WorkCard study={study} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Separator and Additional Projects */}
                <div className="my-16">
                    <div className="h-px bg-outline-variant w-full max-w-4xl mx-auto" />
                </div>

                <motion.div
                    variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    className={`text-center ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                >
                    <h3 className="text-3xl font-bold mb-8">Additional Projects</h3>
                </motion.div>

                <motion.div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                    variants={prefersReducedMotion ? SIMPLE_STAGGER_CONTAINER : FADE_UP_STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                >
                    {additionalProjects.map((project, index) => (
                        <motion.div key={index} variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}>
                           <AdditionalProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};


const HomePage: React.FC = () => {
    const setActiveSection = useGlobalStore((state) => state.setActiveSection);
    const { setActiveModal } = useGlobalStore();
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const observerOptions = {
            root: null,
            // Creates a "scan-line" just below the sticky header.
            // A section is "active" when its top edge crosses this line.
            // The large negative bottom margin ensures sections become "inactive"
            // once they are scrolled well past the line, allowing the next one to trigger.
            rootMargin: '-80px 0px -40% 0px',
            threshold: 0, // Trigger as soon as the element's top enters the rootMargin area
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When an entry is intersecting, it means its top has crossed our scan-line.
                // We set it as the active section.
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const currentRefs = sectionRefs.current;
        currentRefs.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            currentRefs.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [setActiveSection]);
    
    const solutions = solutionsData;

    const colorClasses: { [key: string]: { bg: string, text: string } } = {
        primary: { bg: 'bg-primary-50/10', text: 'text-primary-50' },
        error: { bg: 'bg-error/10', text: 'text-error' },
        warning: { bg: 'bg-warning/10', text: 'text-warning' },
        success: { bg: 'bg-success/10', text: 'text-success' },
    };
    
    const handleOpenSolutionModal = (solution: any) => {
        setActiveModal('solution-modal', solution);
    };

    return (
        <>
            <section id="hero" ref={(el) => { sectionRefs.current[0] = el; }}>
                <HeroSection />
            </section>
            
            <section id="solutions" ref={(el) => { sectionRefs.current[1] = el; }} className="py-20 md:py-32 bg-surface-container text-on-surface">
                <div className="container text-center">
                    <motion.div
                        variants={prefersReducedMotion ? SIMPLE_FADE : FADE_UP}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                        className={`${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                    >
                        <h2 className="text-4xl font-bold mb-4">Intelligent Solutions for Modern Business</h2>
                        <p className="text-lg text-on-surface-variant max-w-3xl mx-auto mb-16">
                            We fuse deep technical expertise with cutting-edge AI to build powerful, scalable, and intelligent systems that deliver tangible results.
                        </p>
                    </motion.div>
                    <motion.div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 ${!prefersReducedMotion ? '[will-change:transform,opacity]' : ''}`}
                        variants={prefersReducedMotion ? SIMPLE_STAGGER_CONTAINER : FADE_UP_STAGGER_CONTAINER}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2, margin: "0px 0px -150px 0px" }}
                    >
                       {solutions.map((s, i) => (
                            <motion.div key={i} variants={prefersReducedMotion ? SIMPLE_STAGGER_CHILD : FADE_UP_STAGGER_CHILD}>
                                <Card 
                                    className="group elevation-1 hover:elevation-2 transition-all duration-300 flex flex-col text-left cursor-pointer h-full"
                                    onClick={() => handleOpenSolutionModal(s)}
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${colorClasses[s.color].bg}`}>
                                        <s.icon size={28} className={colorClasses[s.color].text} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                                    <p className="text-on-surface-variant mb-4 flex-grow">{s.shortDescription}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {s.chips.map((chip) => (
                                            <span key={chip} className="px-2.5 py-1 text-xs font-medium bg-surface-container-high rounded-full text-on-surface-variant">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            <section id="work" ref={(el) => { sectionRefs.current[2] = el; }}>
                <WorkSection />
            </section>

            <section id="process" ref={(el) => { sectionRefs.current[3] = el; }}>
                <ProcessSection />
            </section>

            <section id="about" ref={(el) => { sectionRefs.current[4] = el; }}>
                <AboutSection />
            </section>
        </>
    );
};

export default HomePage;