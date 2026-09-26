import { useMutation } from "@tanstack/react-query";
import { sendMessage } from '../api/greenApi'
import type { Message } from '../types/chat'
import type { Credentials, SendMessagePayload } from '../types/greenApi'
import { useChatStore } from "../store/useChatStore";

export function useSendMessage() {   
  const addMessage = useChatStore(s => s.addMessage)
  const mutation = useMutation({
    mutationFn: async ({ credentials, payload }: { credentials: Credentials; payload: SendMessagePayload }) => {
      return await sendMessage(credentials, payload)
    },
    
    onSuccess: (data, variables) => {      
      
      const { chatId, message: text } = variables.payload
      
      const newMessage: Message = {
        id: data.idMessage,
        text,
        chatId,
        timestamp: Date.now(),
        isOutgoing: true,
      }
      
      addMessage(chatId, newMessage)
    },

    onError: (error) => {
      console.error('Ошибка отправки:', error)
    },
  })

  return { ...mutation }
}