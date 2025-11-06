import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGlobalStore } from '../../store/globalStore';
import ProjectFormModal from './ProjectFormModal';
import SolutionModal from './SolutionModal';
import CaseStudyModal from './CaseStudyModal';
import AccessibilityModal from './AccessibilityModal';

const GlobalModals: React.FC = () => {
    const { activeModal } = useGlobalStore();

    return (
        <AnimatePresence mode="wait">
            {activeModal === 'project-form' && <ProjectFormModal />}
            {activeModal === 'solution-modal' && <SolutionModal />}
            {activeModal === 'case-study-modal' && <CaseStudyModal />}
            {activeModal === 'accessibility-modal' && <AccessibilityModal />}
        </AnimatePresence>
    );
};

export default GlobalModals;