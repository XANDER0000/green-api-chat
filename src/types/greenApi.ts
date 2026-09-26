export type Credentials = {
  idInstance: string,
  apiToken: string,
}

export type Message = {
  chatId: string,
  message: string,
}

export interface Notification {
  receiptId: number
  body: NotificationBody
}

export interface NotificationBody {
  typeWebhook: string
  senderData: {
    chatId: string
    senderName?: string
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