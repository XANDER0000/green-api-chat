export type Credentials = {
  idInstance: string,
  apiToken: string,
}

export interface SendMessagePayload {
  chatId: string
  message: string
}

export interface Notification {
  receiptId: number
  body: NotificationBody
}

export interface NotificationBody {
  typeWebhook: string
  timestamp: number,
  idMessage: string,
  senderData: {
    chatId: string
    senderName?: string
    chatName?: string 
    senderPhoneNumber?: number
  }
  messageData?: {
    typeMessage: string
    textMessageData?: {
      textMessage: string
    }
  }
}

export interface DeleteResult {
  result: boolean
}