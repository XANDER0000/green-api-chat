import { create } from 'zustand';
import type { Chat, ChatState } from '../types/chat';

export const useChatStore = create<ChatState>((set) => ({
  activeChat: null,
  chats: [],
  setActiveChat: (chatId: string) => set({ activeChat: chatId }),
  addChat: (chat: Chat) => set((state) => ({ chats: [...state.chats, chat] })),
  removeChat: (chatId: string) =>
    set((state) => ({ 
      chats: state.chats.filter(c => c.chatId !== chatId),
      activeChat: state.activeChat === chatId ? null : state.activeChat,
    })),
  updateChat: (chatId, data) =>
    set((state) => ({
      chats: state.chats.map(c =>
        c.chatId === chatId ? { ...c, ...data } : c
      ),
    })),
  messages: {},
  addMessage: (chatId, message) =>
    set((state) => {
      const existing = state.messages[chatId] || []
      if (existing.some(m => m.id === message.id)) return state
      return {
        messages: {
          ...state.messages,
          [chatId]: [...existing, message],
        },
      }
    }),
}));
