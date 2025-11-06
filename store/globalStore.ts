



import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Theme, ModalType } from '../types';
import { useFormStore } from './formStore';

interface GlobalState {
  theme: Theme;
  isChatOpen: boolean;
  activeModal: ModalType;
  activeModalData: any;
  isMobileMenuOpen: boolean;
  activeSection: string;
  activeModel: 'gemini' | 'grok';
}

interface GlobalActions {
  setTheme: (theme: Theme) => void;
  toggleChat: (forceState?: boolean) => void;
  setActiveModal: (modal: ModalType, data?: any) => void;
  toggleMobileMenu: () => void;
  setActiveSection: (sectionId: string) => void;
  setActiveModel: (model: 'gemini' | 'grok') => void;
}

export const useGlobalStore = create<GlobalState & GlobalActions>()(
  persist(
    (set) => ({
      // State
      theme: 'true-black',
      isChatOpen: false,
      activeModal: null,
      activeModalData: null,
      isMobileMenuOpen: false,
      activeSection: 'hero',
      activeModel: 'gemini',

      // Actions
      setTheme: (theme) => set({ theme }),
      toggleChat: (forceState) => set((state) => ({ isChatOpen: forceState !== undefined ? forceState : !state.isChatOpen })),
      setActiveModal: (modal, data = null) => {
        set({ activeModal: modal, activeModalData: data });
        // If we are closing a modal that might be the form, ensure form state is reset
        if (modal === null) {
            useFormStore.getState().resetForm();
        }
      },
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setActiveSection: (sectionId) => set({ activeSection: sectionId }),
      setActiveModel: (model) => set({ activeModel: model }),
    }),
    {
      name: 'theme-preference',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
