
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

import { useGlobalStore } from '../store/globalStore';
import Header from './layout/Header';
import ChatbotFAB from './chatbot/ChatbotFAB';
import GlobalModals from './modals/GlobalModals';
import ChatbotPanel from './chatbot/ChatbotPanel';
import Footer from './layout/Footer';
import MobileNavDrawer from './layout/MobileNavDrawer';
import { FADE_UP } from '../utils/motion';


// --- Reusable Components ---
const ScrollProgressBar: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-primary-50 origin-[0%] z-[60]"
            // FIX: Motion values for transforms like scaleX must be passed to the `style` prop.
            style={{ scaleX }}
        />
    );
};

// --- Main AppContainer ---
const AppContainer: React.FC = () => {
    const { isMobileMenuOpen } = useGlobalStore();
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface overflow-x-hidden">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <ScrollProgressBar />
            <Header hamburgerRef={hamburgerRef} />
            <main id="main-content" tabIndex={-1} className="flex-grow pt-14 md:pt-[60px] lg:pt-16 focus:outline-none">
                <motion.div
                    variants={FADE_UP}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <Outlet />
                </motion.div>
            </main>
            <Footer />
            <MobileNavDrawer triggerRef={hamburgerRef} />
            <ChatbotFAB />
            <ChatbotPanel />
            <GlobalModals />
        </div>
    );
};

export default AppContainer;