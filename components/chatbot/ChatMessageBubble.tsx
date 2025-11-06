import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ChatMessage } from '../../types';
import Logomark from '../branding/Logomark';
import { usePrefersReducedMotion } from '../../utils/motion';

interface ChatMessageBubbleProps {
    message: ChatMessage;
    showAvatar: boolean;
    isLoading?: boolean;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, showAvatar, isLoading = false }) => {
    const isModel = message.role === 'model';
    const prefersReducedMotion = usePrefersReducedMotion();

    const variants = prefersReducedMotion 
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { 
            opacity: 0, 
            x: isModel ? -20 : 20,
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3, ease: 'easeOut' as const },
        },
    };

    const typingIndicator = (
        <div className="flex items-center space-x-1.5 px-2 py-2">
            {[0, 1, 2].map(i => (
                <motion.div
                    key={i}
                    className="w-2 h-2 bg-on-surface-variant rounded-full"
                    animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut" as const,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    );

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className={`flex w-full items-end gap-2 ${isModel ? 'justify-start' : 'justify-end'}`}
        >
            {isModel && (
                <div className={`w-8 h-8 flex-shrink-0 transition-opacity duration-300 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                    {showAvatar && (
                        <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">
                            <Logomark size={18} />
                        </div>
                    )}
                </div>
            )}
            <div
                className={`
                    max-w-[90%] md:max-w-[85%] px-4 py-3 text-base
                    ${isModel
                        ? 'bg-surface-container-low border border-outline-variant text-on-surface'
                        : 'bg-primary-50 text-on-primary'
                    }
                `}
                style={{
                    borderRadius: isModel 
                        ? '20px 20px 20px 4px'
                        : '20px 20px 4px 20px'
                }}
            >
                {isLoading ? (
                    typingIndicator
                ) : (
                    <div className="chat-bubble-prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-0 text-inherit">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ChatMessageBubble;