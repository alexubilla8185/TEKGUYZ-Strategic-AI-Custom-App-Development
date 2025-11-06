import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useRipple } from '../../hooks/useRipple';

const ChatInput: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const sendMessage = useChatStore((state) => state.sendMessage);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { addRipple, RippleElements } = useRipple<HTMLButtonElement>({ color: 'bg-white/30' });

    const handleSend = () => {
        const trimmedMessage = inputValue.trim();
        if (trimmedMessage) {
            sendMessage(trimmedMessage);
            setInputValue('');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Reset height to shrink on delete
            textarea.style.height = 'auto';
            // Set height based on scroll height
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [inputValue]);
    
    const isInputEmpty = inputValue.trim() === '';

    return (
        <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex-shrink-0 bg-surface-container-high border-t border-outline-variant px-4 py-3 md:px-5 md:py-4"
        >
            <div className="flex items-end gap-2">
                <div className="relative flex-grow">
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        rows={1}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-[24px] pl-4 pr-5 py-3 resize-none text-base text-on-surface placeholder-on-surface-variant transition-all duration-200 focus:border-primary-40 min-h-[48px] max-h-[120px]"
                        style={{ fontSize: '16px' }} // Prevents iOS zoom
                        aria-label="Chat message input"
                    />
                </div>
                <motion.button
                    type="submit"
                    onClick={addRipple}
                    disabled={isInputEmpty}
                    className="relative w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden"
                    whileTap={{ scale: 0.95 }}
                    animate={isInputEmpty ? { backgroundColor: 'var(--on-surface-variant)', opacity: 0.4, cursor: 'not-allowed' } : { backgroundColor: 'var(--primary-50)', opacity: 1, cursor: 'pointer' }}
                    aria-label="Send message"
                >
                    <Send size={20} className="text-white" />
                    <RippleElements />
                </motion.button>
            </div>
        </form>
    );
};

export default ChatInput;