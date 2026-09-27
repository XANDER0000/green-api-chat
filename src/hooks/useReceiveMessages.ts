import { useEffect } from 'react'
import { receiveNotification, deleteNotification } from '../api/greenApi'
import { useChatStore } from '../store/useChatStore'
import type { Credentials } from '../types/greenApi'
import { parseNotification } from '../utils/notification'

export function useReceiveMessages(credentials: Credentials | null) {
  const addMessage = useChatStore(s => s.addMessage)

  useEffect(() => {
    if (!credentials) return

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const poll = async () => {
      if (cancelled) return

      try {
        const notification = await receiveNotification(credentials)
        
        if (notification) {
          const message = parseNotification(notification)
          
          if (message) {
            addMessage(message.chatId, message)

            const { chats, addChat, updateChat } = useChatStore.getState()
            const existingChat = chats.find(c => c.chatId === message.chatId)
            const chatName = notification.body.senderData.chatName 
            || notification.body.senderData.senderName
            || ''

            if (existingChat) {
              if (chatName && existingChat.name !== chatName) {
                updateChat(message.chatId, { name: chatName })
              }
            } else {
              addChat({
                chatId: message.chatId,
                name: chatName || '',
                updatedAt: message.timestamp,
              })
            }
          }

          await deleteNotification(credentials, notification.receiptId)
        }
      } catch (error) {
        if (!cancelled) {
          console.warn('Polling error:', error)
        }
      }

      if (!cancelled) {
        timeoutId = setTimeout(poll, 300)
      }
    }

    timeoutId = setTimeout(poll, 0)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [credentials, addMessage])
}