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
  messages: {},
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
}));
