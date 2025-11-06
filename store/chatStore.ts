import { create } from 'zustand';
import { ChatMessage } from '../types';
import { postChatMessage } from '../services/chatService';
import { useGlobalStore } from './globalStore';
import { useFormStore } from './formStore';

// Regex to find and parse commands
const ACTION_REGEX = /\[ACTION:OPEN_FORM\]({.*})/;
const CHIPS_REGEX = /\[CHIPS:(\[.*\])\]/;

const WELCOME_MESSAGE: ChatMessage = {
    role: 'model',
    content: "Hi! I'm the TEKGUYZ AI Assistant. I can help answer your questions and see if our solutions are a good fit for your project. What can I help you with today?"
};


interface ChatState {
  isAiServiceOnline: boolean;
  chatHistory: ChatMessage[];
  isChatLoading: boolean;
  currentSuggestionChips: string[];
}

interface ChatActions {
  sendMessage: (message: string) => Promise<void>;
  setAiServiceStatus: (isOnline: boolean) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  // State
  isAiServiceOnline: true,
  chatHistory: [WELCOME_MESSAGE],
  isChatLoading: false,
  currentSuggestionChips: ["What services do you offer?", "Tell me about your process.", "Can you build a custom chatbot?"],
  
  // Actions
  setAiServiceStatus: (isOnline) => set({ isAiServiceOnline: isOnline }),

  resetChat: () => set({ 
    chatHistory: [WELCOME_MESSAGE], 
    isChatLoading: false,
    currentSuggestionChips: ["What services do you offer?", "Tell me about your process.", "Can you build a custom chatbot?"]
  }),

  sendMessage: async (message) => {
    if (get().isChatLoading || !get().isAiServiceOnline) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    set((state) => ({
      chatHistory: [...state.chatHistory, userMessage],
      isChatLoading: true,
      currentSuggestionChips: [],
    }));

    // Exclude the initial welcome message from the history sent to the API
    const historyForApi = get().chatHistory.slice(1);
    const activeModel = useGlobalStore.getState().activeModel;

    try {
      const response = await postChatMessage(historyForApi, message, activeModel);
      let responseText = response.text || "Sorry, I couldn't process that. Please try again.";
      
      let suggestionChips: string[] = [];
      let handoffData: any = null;

      // Parse suggestion chips
      const chipMatch = responseText.match(CHIPS_REGEX);
      if (chipMatch && chipMatch[1]) {
        try {
          suggestionChips = JSON.parse(chipMatch[1]);
          responseText = responseText.replace(CHIPS_REGEX, '').trim();
        } catch (e) { console.error("Failed to parse chips:", e); }
      }

      // Parse handoff action
      const actionMatch = responseText.match(ACTION_REGEX);
      if (actionMatch && actionMatch[1]) {
        try {
          handoffData = JSON.parse(actionMatch[1]);
          responseText = responseText.replace(ACTION_REGEX, '').trim();
        } catch (e) { console.error("Failed to parse action form data:", e); }
      }

      const modelMessage: ChatMessage = { role: 'model', content: responseText };
      set((state) => ({
        chatHistory: [...state.chatHistory, modelMessage],
        currentSuggestionChips: suggestionChips,
      }));

      // Trigger handoff if data is present, with a delay for UX
      if (handoffData && handoffData.prefill) {
        setTimeout(() => {
            useFormStore.getState().initializePrefill(handoffData.prefill);
            useGlobalStore.getState().toggleChat(false);
            // Open form after chat close animation
            setTimeout(() => {
                useGlobalStore.getState().setActiveModal('project-form');
            }, 400);
        }, 800);
      }

    } catch (error: any) {
      console.error("Chat service error:", error);
      let errorMessage: string;
      if (error.status === 503) {
        errorMessage = "Our AI assistant is temporarily unavailable. Please use the contact form instead or try again later.";
        set({ isAiServiceOnline: false });
      } else {
        errorMessage = "A connection error occurred. Please check your network and try again.";
      }
      
      const errorMessageObj: ChatMessage = { role: 'model', content: errorMessage };
      set((state) => ({ chatHistory: [...state.chatHistory, errorMessageObj] }));
    } finally {
      set({ isChatLoading: false });
    }
  },
}));