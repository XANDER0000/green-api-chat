import type { Chat } from '../types/chat'

export function getChatName(chat?: Chat, fallback = ''): string {
  if (!chat) return fallback
  return chat.name || chat.chatId.split('@')[0] || fallback
}