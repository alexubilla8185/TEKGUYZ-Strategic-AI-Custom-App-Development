



import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Star, Rocket } from 'lucide-react';
import { useGlobalStore } from '../../store/globalStore';
import { useRipple } from '../../hooks/useRipple';
import Logomark from '../branding/Logomark';
import Wordmark from '../branding/Wordmark';
import Button from '../common/Button';
import { Theme } from '../../types';

// Reusable NavLink for the drawer
const DrawerNavLink: React.FC<{ href: string; children: React.ReactNode; }> = ({ href, children }) => {
    const { activeSection, toggleMobileMenu } = useGlobalStore();
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>({ color: 'bg-primary-50/20' });
    const isActive = activeSection === href.substring(1);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(e);
        toggleMobileMenu(); // Close drawer first

        setTimeout(() => {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const yOffset = -80;
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 300); // Delay to allow drawer close animation
    };

    return (
        <li>
            <motion.button
                onClick={handleClick}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full flex items-center gap-4 px-5 py-4 rounded-lg text-xl font-medium text-left transition-colors duration-200
                ${isActive ? 'text-primary-50' : 'text-on-surface hover:bg-surface-container'}`}
            >
                <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-300 ${isActive ? 'bg-primary-50' : 'bg-transparent'}`}/>
                {isActive && <div className="absolute inset-0 bg-primary-50/10" />}
                <span className="relative z-10">{children}</span>
                <RippleElements />
            </motion.button>
        </li>
    );
};

const MobileNavDrawer: React.FC<{ triggerRef: React.RefObject<HTMLButtonElement> }> = ({ triggerRef }) => {
    const { isMobileMenuOpen, toggleMobileMenu, setActiveModal } = useGlobalStore();
    const drawerRef = useRef<HTMLDivElement>(null);
    const liveRegionRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isMobileMenuOpen && event.key === 'Escape') {
                toggleMobileMenu();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen, toggleMobileMenu]);

    // Focus Trap & Screen Reader Announcements
    useEffect(() => {
        if (isMobileMenuOpen && drawerRef.current) {
            if(liveRegionRef.current) liveRegionRef.current.textContent = "Navigation menu opened";
            const focusableElements = (Array.from(
                drawerRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                )
            ) as HTMLElement[]).filter(el => !el.hasAttribute('disabled'));

            if (focusableElements.length > 0) {
                const firstElement = focusableElements[1] || focusableElements[0]; // focus first nav link
                const lastElement = focusableElements[focusableElements.length - 1];
                firstElement.focus();
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
                document.addEventListener('keydown', handleTabKeyPress);
                return () => {
                    document.removeEventListener('keydown', handleTabKeyPress);
                    if(liveRegionRef.current) liveRegionRef.current.textContent = "Navigation menu closed";
                    triggerRef.current?.focus(); // Return focus on close
                };
            }
        } else {
            if(liveRegionRef.current) liveRegionRef.current.textContent = "";
        }
    }, [isMobileMenuOpen, triggerRef]);

    const handleStartProject = () => {
        toggleMobileMenu();
        setTimeout(() => {
            setActiveModal('project-form');
        }, 300);
    };

    const navLinks = [
        { name: 'Solutions', href: '#solutions' },
        { name: 'Our Work', href: '#work' },
        { name: 'Process', href: '#process' },
        { name: 'About', href: '#about' },
    ];

    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <>
                    <div ref={liveRegionRef} className="sr-only" aria-live="assertive" />
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[1099] md:hidden"
                        onClick={toggleMobileMenu}
                        aria-hidden="true"
                    />
                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '-100%', opacity: 0.9 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }}
                        className="fixed top-0 left-0 h-[100dvh] w-[80vw] max-w-[320px] bg-surface border-r border-outline-variant elevation-4 flex flex-col z-[1100] md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        {/* Drawer Header */}
                        <header className="flex-shrink-0 flex items-center justify-between p-5 pr-3 border-b border-outline-variant h-20">
                            <div className="flex items-center gap-3">
                                <Logomark size={32} />
                                <Wordmark className="!flex text-[20px] font-semibold tracking-[-0.5px]" />
                            </div>
                            <Button variant="text" onClick={toggleMobileMenu} className="!w-12 !h-12 !p-0" aria-label="Close navigation menu">
                                <X size={24} />
                            </Button>
                        </header>
                        
                        {/* Navigation Links */}
                        <nav className="flex-grow p-4 overflow-y-auto">
                            <ul className="space-y-1">
                                {navLinks.map(link => (
                                    <DrawerNavLink key={link.name} href={link.href}>
                                        {link.name}
                                    </DrawerNavLink>
                                ))}
                            </ul>
                        </nav>

                        {/* Footer and CTA */}
                        <footer className="flex-shrink-0 p-5 bg-surface border-t border-outline-variant">
                             <Button onClick={handleStartProject} variant="primary" className="w-full h-14 text-base font-semibold">
                                Start Your Project
                                <Rocket size={20} className="ml-2"/>
                            </Button>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileNavDrawer;