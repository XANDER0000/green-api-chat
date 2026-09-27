import type { Message } from "../types/chat";
import type { Notification } from "../types/greenApi";

export function parseNotification(noti: Notification): Message | null {
  if (noti.body.typeWebhook !== 'incomingMessageReceived') return null
  
  const text = noti.body.messageData?.textMessageData?.textMessage
  if (!text) return null
  
  const phone = noti.body.senderData.senderPhoneNumber
  if (!phone) return null
  
  return {
    id: noti.body.idMessage,
    text,
    chatId: `${phone}@c.us`,
    timestamp: noti.body.timestamp * 1000,
    isOutgoing: false,
  }
}