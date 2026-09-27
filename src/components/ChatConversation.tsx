import { memo } from 'react'
import { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useSendMessage } from '../hooks/useSendMessage'
import { getCredentials } from '../auth/authUtils'
import MessageItem from './MessageItem';

interface Props {
  chatName: string,
  chatId: string
}

function ChatConversation({chatName, chatId}: Props) {
  const messages = useChatStore(s => s.messages)
  const [message, setMessage] = useState('')
  const sendMessage = useSendMessage()

  const handleSend = () => {
    const credentials = getCredentials()
    if (!credentials || !message.trim()) return
    
    sendMessage.mutate({
      credentials,
      payload: { chatId, message: message.trim() },
    })
    setMessage('')
  }

  return (
     <div className="conversation">
      <header className="conversation-header">
        <div className="conversation-avatar" aria-hidden="true"> {chatName.slice(0, 1).toUpperCase()}</div>
        <div>
          <h2>{chatName}</h2>
          <p>Чат</p>
        </div>
      </header>
      <div className="conversation-messages" aria-label="Сообщения">
        {messages[chatId]?.length ? (
          messages[chatId].map((chatMessage) => (
            <MessageItem key={chatMessage.id} message={chatMessage}/>
          ))
        ) : (
          <p className="conversation-empty">Сообщения появятся здесь</p>
        )}
      </div>
      <div className="message-composer">
        <input type="text" aria-label="Текст сообщения" placeholder="Введите сообщение" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="message-send-button" type="button" aria-label="Отправить сообщение" onClick={() => handleSend()} disabled={!message || sendMessage.isPending}>
          <span aria-hidden="true">&#8593;</span>
        </button>
      </div>
    </div>
  )
}

export default memo(ChatConversation)