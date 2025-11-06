import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AppContainer from '../components/AppContainer';
import HomePage from '../pages/HomePage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import NotFoundPage from '../pages/NotFoundPage';
import AIEthicsPage from '../pages/AIEthicsPage';
import CookiePolicyPage from '../pages/CookiePolicyPage';

const RootLayout: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<AppContainer />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/ai-ethics" element={<AIEthicsPage />} />
                    <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default RootLayout;