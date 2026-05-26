import { create } from 'zustand';

export const useAppStore = create((set) => ({
  currentSession: null,
  sessions: [],
  isLoading: false,
  error: null,
  
  setCurrentSession: (session) => set({ currentSession: session }),
  setSessions: (sessions) => set({ sessions }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addChatMessage: (message) => set((state) => ({
    currentSession: {
      ...state.currentSession,
      chatHistory: [...(state.currentSession?.chatHistory || []), message]
    }
  })),
}));
