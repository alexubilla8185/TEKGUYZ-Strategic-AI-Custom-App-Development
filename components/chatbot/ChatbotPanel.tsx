





import React, { useRef, useEffect } from 'react';
// FIX: Import Variants type to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { X, AlertCircle } from 'lucide-react';
import { useGlobalStore } from '../../store/globalStore';
import { useChatStore } from '../../store/chatStore';
import { usePrefersReducedMotion, SLIDE_IN_RIGHT } from '../../utils/motion';
import Logomark from '../branding/Logomark';
import ChatMessageBubble from './ChatMessageBubble';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import Button from '../common/Button';
import { useRipple } from '../../hooks/useRipple';

const ChatbotPanel: React.FC = () => {
    const { isChatOpen, toggleChat, setActiveModal } = useGlobalStore();
    const { chatHistory, isChatLoading, isAiServiceOnline } = useChatStore();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const prefersReducedMotion = usePrefersReducedMotion();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>();
    
    const handleClose = () => toggleChat(false);
    
    const handleCloseWithRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        addRipple(event);
        handleClose();
    };
    
    // Handle Escape key to close the panel
    useEffect(() => {
        if (!isChatOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isChatOpen]);
    
    // Focus Trap
    useEffect(() => {
        if (!isChatOpen || !panelRef.current) return;
        const panelNode = panelRef.current;
        const focusableElements = Array.from(
            panelNode.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ) as HTMLElement[];
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;
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
        };

        panelNode.addEventListener('keydown', handleTabKeyPress);
        return () => panelNode.removeEventListener('keydown', handleTabKeyPress);
    }, [isChatOpen]);

    // Scroll to bottom when new messages appear
    useEffect(() => {
        if (isChatOpen && messagesEndRef.current) {
            setTimeout(() => {
                 if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                 }
            }, 100);
        }
    }, [chatHistory, isChatLoading, isChatOpen]);

    // Animation variants
    const backdropVariants: Variants = {
        visible: { opacity: 1, transition: { duration: 0.4 } },
        hidden: { opacity: 0, transition: { duration: 0.3 } },
    };

    // FIX: Define easing curves as explicit tuples and type the variants object.
    const easeOut: [number, number, number, number] = [0.4, 0.0, 0.2, 1];
    const easeIn: [number, number, number, number] = [0.4, 0.0, 1, 1];
    const mobilePanelVariants: Variants = prefersReducedMotion ? {
        visible: { opacity: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, transition: { duration: 0.4 } },
    } : {
        visible: { y: 0, transition: { duration: 0.5, ease: easeOut } },
        hidden: { y: "100%", transition: { duration: 0.4, ease: easeIn } },
    };

    const ErrorCard = () => (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-error/5 border-2 border-error rounded-2xl">
            <AlertCircle size={48} className="text-error mb-4" />
            <h3 className="text-xl font-bold text-on-surface">AI Service Offline</h3>
            <p className="text-on-surface-variant my-2 max-w-xs">Our AI assistant is temporarily unavailable. Please use the contact form instead.</p>
            <Button onClick={() => { handleClose(); setTimeout(() => setActiveModal('project-form'), 400); }} className="mt-4">
                Open Contact Form
            </Button>
        </div>
    );
    
    return (
        <AnimatePresence>
            {isChatOpen && (
                <>
                    {isMobile && (
                        <motion.div
                            key="chatbot-backdrop"
                            className="fixed inset-0 bg-black/50 z-[1000]"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={handleClose}
                        />
                    )}

                    <motion.div
                        ref={panelRef}
                        key="chatbot-panel"
                        drag={isMobile && !prefersReducedMotion ? "y" : false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.8}
                        onDragEnd={(_, info) => {
                            if (isMobile && info.offset.y > 150) {
                                handleClose();
                            }
                        }}
                        variants={isMobile ? mobilePanelVariants : SLIDE_IN_RIGHT}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`
                            fixed flex flex-col z-[1001] overflow-hidden
                            ${isMobile 
                                ? 'bottom-0 left-0 w-full h-[85vh] bg-surface rounded-t-[28px]' 
                                : 'bottom-8 right-8 w-[420px] h-[650px] bg-surface rounded-[24px] border border-outline-variant elevation-5'
                            }
                        `}
                        style={!isMobile ? { transformOrigin: 'bottom right' } : {}}
                        aria-modal="true"
                        role="dialog"
                        aria-label="Chatbot Assistant"
                    >
                        {isMobile && (
                            <div className="w-full py-4 flex justify-center flex-shrink-0 cursor-grab active:cursor-grabbing">
                                <div className="w-[120px] h-1 bg-on-surface-variant rounded-full" />
                            </div>
                        )}
                        
                        <header className={`flex items-center justify-between p-4 flex-shrink-0 border-b border-outline-variant bg-surface-container-high ${isMobile ? 'h-16' : 'h-[72px]'}`}>
                           <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">
                                        <Logomark size={24}/>
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface-container-high ${isAiServiceOnline ? 'bg-success' : 'bg-error'}`}/>
                                </div>
                                <div>
                                    <h2 className="font-bold text-on-surface">TEKGUYZ Assistant</h2>
                                    <p className="text-sm text-on-surface-variant">{isAiServiceOnline ? 'Online' : 'Offline'}</p>
                                </div>
                           </div>
                           <button onClick={handleCloseWithRipple} className="relative w-12 h-12 flex items-center justify-center rounded-full hover:bg-on-surface/10 transition-colors overflow-hidden" aria-label="Close chat">
                                <X size={24} className="text-on-surface"/>
                                <RippleElements />
                           </button>
                        </header>
                        
                        {isAiServiceOnline ? (
                            <>
                                <div className="flex-grow flex flex-col p-4 md:p-5 overflow-y-auto chatbot-scroll-content" aria-live="polite" aria-atomic="false">
                                <div className="flex-grow" />
                                <div className="flex flex-col gap-4">
                                        {chatHistory.map((message, index) => {
                                            const showAvatar = message.role === 'model' && (index === 0 || chatHistory[index - 1]?.role !== 'model');
                                            return <ChatMessageBubble key={index} message={message} showAvatar={showAvatar} />;
                                        })}
                                        {isChatLoading && (
                                            <ChatMessageBubble 
                                                message={{ role: 'model', content: '' }} 
                                                showAvatar={chatHistory[chatHistory.length - 1]?.role !== 'model'}
                                                isLoading={true} 
                                            />
                                        )}
                                </div>
                                <div ref={messagesEndRef} />
                                </div>
                                <SuggestionChips />
                                <ChatInput />
                            </>
                        ) : (
                            <div className="flex-grow flex items-center justify-center p-4">
                               <ErrorCard />
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ChatbotPanel;