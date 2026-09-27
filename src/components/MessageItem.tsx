import { memo } from 'react'
import type { Message } from '../types/chat';

interface Props {
  message: Message,  
}

function MessageItem({message}: Props) {

  return (
    <div
      className={`message-row ${message.isOutgoing ? 'outgoing' : 'incoming'}`}
    >
      <div className="message-bubble">
        <p>{message.text}</p>
        <time dateTime={new Date(message.timestamp).toISOString()}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  )
}

export default memo(MessageItem)