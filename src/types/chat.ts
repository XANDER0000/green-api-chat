export interface Chat {
  chatId: string
  name?: string 
  lastMessage?: string
  updatedAt: number
}

export interface Message {
  id: string        
  text: string
  chatId: string
  timestamp: number
  isOutgoing: boolean 
}

export interface ChatState {
  activeChat: string | null
  chats: Chat[]
  messages: Record<string, Message[]>
  addMessage: (chatId: string, message: Message) => void
  setActiveChat: (chatId: string) => void
  addChat: (chat: Chat) => void
  removeChat: (chatId: string) => void 
}