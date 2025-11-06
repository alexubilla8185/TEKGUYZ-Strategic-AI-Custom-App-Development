
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Star, Sparkles, Rocket, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../store/globalStore';
import Logomark from '../branding/Logomark';
import Wordmark from '../branding/Wordmark';
import Button from '../common/Button';
import { useRipple } from '../../hooks/useRipple';
import { Theme } from '../../types';

const AnimatedHamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    // FIX: Explicitly type the cubic-bezier array to satisfy framer-motion's easing prop type.
    const ease: [number, number, number, number] = [0.4, 0.0, 0.2, 1];
    const lineProps = {
        stroke: 'var(--on-surface)',
        strokeWidth: 2,
        vectorEffect: 'non-scaling-stroke',
        initial: 'closed',
        animate: isOpen ? 'open' : 'closed',
        transition: { duration: 0.3, ease: ease },
    };

    const topVariants = {
        closed: { d: "M 2 8 L 22 8" },
        open: { d: "M 5 20 L 19 6" },
    };
    const middleVariants = {
        closed: { opacity: 1 },
        open: { opacity: 0 },
        transition: { duration: 0.1 }
    };
    const bottomVariants = {
        closed: { d: "M 2 16 L 22 16" },
        open: { d: "M 5 6 L 19 20" },
    };

    return (
        <motion.svg
            viewBox="0 0 24 24"
            overflow="visible"
            preserveAspectRatio="none"
            width={24}
            height={24}
        >
            <motion.path {...lineProps} variants={topVariants} />
            <motion.path {...lineProps} variants={middleVariants} />
            <motion.path {...lineProps} variants={bottomVariants} />
        </motion.svg>
    );
};


// Helper component for smooth scrolling nav links
const NavLink: React.FC<{ href: string; children: React.ReactNode; }> = ({ href, children }) => {
    const { activeSection, setActiveSection } = useGlobalStore();
    const { addRipple, RippleElements } = useRipple<HTMLAnchorElement>();

    const isActive = activeSection === href.substring(1);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addRipple(e);
        const targetId = href.substring(1);
        setActiveSection(targetId); // Instant feedback on click
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const yOffset = -80; // As per prompt
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            // Custom smooth scroll implementation for easing
            const startY = window.pageYOffset;
            const distance = y - startY;
            const duration = 600; // ms
            let startTime: number | null = null;

            const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
                window.scrollTo(0, startY + distance * run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <li className="relative">
            <a
                href={href}
                onClick={handleClick}
                className={`relative flex items-center justify-center h-12 rounded-xl text-sm transition-all duration-200 ease-out 
                    md:px-3 lg:px-4
                    ${
                    isActive
                        ? 'text-primary-50 font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface hover:scale-102'
                }`}
            >
                {children}
                <RippleElements />
            </a>
             {isActive && (
                <motion.div
                    layoutId="active-nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary-50 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
            )}
        </li>
    );
};

const Header: React.FC<{ hamburgerRef: React.RefObject<HTMLButtonElement> }> = ({ hamburgerRef }) => {
    const { theme, setTheme, setActiveModal, isMobileMenuOpen, toggleMobileMenu, activeModel, setActiveModel } = useGlobalStore();
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const { addRipple, RippleElements } = useRipple<HTMLElement>();
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            { 
                rootMargin: '-64px 0px 0px 0px',
                threshold: 0.1
            }
        );

        observer.observe(heroSection);
        
        return () => {
            if (heroSection) {
                observer.unobserve(heroSection);
            }
        };
    }, []);

    const themes: Theme[] = ['true-black', 'dark'];

    const handleThemeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(event);
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };
    
    const handleModelToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(event);
        setActiveModel(activeModel === 'gemini' ? 'grok' : 'gemini');
    };

    const handleScrollTop = (event: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(event);
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const navLinks = [
        { name: 'Solutions', href: '#solutions' },
        { name: 'Our Work', href: '#work' },
        { name: 'Process', href: '#process' },
        { name: 'About', href: '#about' },
    ];
    
    const currentThemeMode = theme.replace('-', ' ');

    return (
        <header className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-[20px] border-b border-outline-variant transition-all duration-300 ease-out ${
            isScrolled 
                ? 'h-14 md:h-[60px] lg:h-[60px] elevation-3 bg-surface-container/95' 
                : 'h-14 md:h-[60px] lg:h-16 elevation-2 bg-surface-container/90'
        }`}>
            <div className="container h-full max-w-[1440px] px-4 md:px-5 lg:px-8 xl:px-8">
                
                {/* --- MOBILE LAYOUT (<768px) --- */}
                <div className="grid grid-cols-3 items-center h-full md:hidden">
                    <div className="flex justify-start">
                         <button
                            ref={hamburgerRef}
                            onClick={toggleMobileMenu}
                            className="relative w-12 h-12 flex items-center justify-center rounded-xl z-[1101]"
                            aria-label="Open navigation menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <AnimatedHamburgerIcon isOpen={isMobileMenuOpen} />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={handleScrollTop} 
                            className="relative p-2 rounded-full overflow-hidden" 
                            aria-label="TEKGUYZ, scroll to top"
                        >
                            <Logomark size={36} />
                            <RippleElements />
                        </button>
                    </div>
                    <div className="flex justify-end">
                         <button 
                            onClick={handleThemeChange} 
                            className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-surface-container hover:text-primary-50 hover:scale-105 transition-all duration-200 overflow-hidden"
                            aria-label={`Switch theme, current mode: ${currentThemeMode}`}
                        >
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={theme}
                                    initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                    exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {theme === 'dark' && <Moon size={24} />}
                                    {theme === 'true-black' && <Star size={24} />}
                                </motion.div>
                            </AnimatePresence>
                            <RippleElements />
                        </button>
                    </div>
                </div>

                {/* --- TABLET & DESKTOP LAYOUT (>=768px) --- */}
                <div className="hidden md:flex items-center justify-between h-full">
                     {/* Left Section */}
                     <div className="flex-1 flex justify-start">
                         <motion.button 
                            onClick={handleScrollTop}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="relative flex items-center gap-3 p-2 rounded-xl overflow-hidden" 
                            aria-label="TEKGUYZ, scroll to top"
                        >
                            <Logomark size={isDesktop ? 40 : 32} />
                            <Wordmark className="!flex text-[22px] font-semibold tracking-[-0.5px]" />
                            <RippleElements />
                        </motion.button>
                    </div>

                    {/* Center Section */}
                    <div className="flex-shrink-0">
                        <nav role="navigation" aria-label="Main navigation">
                            <ul className="flex items-center gap-1 md:gap-2">
                                {navLinks.map(link => (
                                    <NavLink key={link.name} href={link.href}>
                                        {link.name}
                                    </NavLink>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    
                    {/* Right Section */}
                    <div className="flex-1 flex justify-end">
                        <div className="flex items-center gap-2 lg:gap-3">
                            <motion.button
                                onClick={handleModelToggle}
                                className="relative hidden lg:flex items-center justify-center h-10 w-[120px] bg-surface-container-high border border-outline-variant rounded-full overflow-hidden hover:bg-surface-container-highest transition-colors duration-200"
                                aria-label={`Switch AI Model, current: ${activeModel === 'gemini' ? 'Gemini' : 'Grok'} AI`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeModel}
                                        className="flex items-center gap-2"
                                        initial={{ y: 15, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -15, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {activeModel === 'gemini' ? (
                                            <Sparkles size={16} className="text-primary-50"/>
                                        ) : (
                                            <Bot size={16} className="text-tertiary-40"/>
                                        )}
                                        <span className="text-sm font-medium">
                                            {activeModel === 'gemini' ? 'Gemini AI' : 'Grok AI'}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                                <RippleElements />
                            </motion.button>
                            <button 
                                onClick={handleThemeChange} 
                                className="relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-surface-container hover:text-primary-50 hover:scale-105 transition-all duration-200 overflow-hidden"
                                aria-label={`Switch theme, current mode: ${currentThemeMode}`}
                            >
                                <AnimatePresence initial={false} mode="wait">
                                    <motion.div
                                        key={theme}
                                        initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                        exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {theme === 'dark' && <Moon size={24} />}
                                        {theme === 'true-black' && <Star size={24} />}
                                    </motion.div>
                                </AnimatePresence>
                                <RippleElements />
                            </button>
                            <Button 
                                onClick={() => setActiveModal('project-form')} 
                                className="h-11 md:h-12 px-5 md:px-6 rounded-xl text-sm font-semibold hover:scale-103 hover:!bg-primary-60 transition-all duration-250 ease-out !bg-primary-50 text-[var(--on-primary)]"
                            >
                                Start Your Project
                                <Rocket size={16} className="ml-2"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
