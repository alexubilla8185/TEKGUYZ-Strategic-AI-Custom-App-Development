import React from 'react';
import { motion } from 'framer-motion';
import { useChatStore } from '../../store/chatStore';
import { useRipple } from '../../hooks/useRipple';

const SuggestionChips: React.FC = () => {
    const { currentSuggestionChips, sendMessage, isChatLoading } = useChatStore();
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>();

    if (isChatLoading || currentSuggestionChips.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    };

    const chipVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const handleChipClick = (event: React.MouseEvent<HTMLButtonElement>, chip: string) => {
        addRipple(event);
        sendMessage(chip);
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 md:px-5 pb-4"
        >
            <div className="flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible pb-2 md:pb-0 chatbot-scroll-content">
                {currentSuggestionChips.map((chip, index) => (
                    <motion.button
                        key={index}
                        variants={chipVariants}
                        onClick={(e) => handleChipClick(e, chip)}
                        className="relative overflow-hidden flex-shrink-0 whitespace-nowrap bg-surface-container-highest border border-outline-variant rounded-2xl px-4 py-4 text-sm font-medium text-on-surface transition-colors duration-200 hover:border-primary-40 hover:bg-primary-10"
                    >
                        {chip}
                        <RippleElements />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default SuggestionChips;