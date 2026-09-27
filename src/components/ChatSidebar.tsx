import { memo } from 'react'
import type { Chat } from '../types/chat';
import { getChatName } from '../utils/chat'

interface Props {
  chats: Chat[],
  activeChat?: string | null,
  onSelectChat: (chatId: string) => void
  onOpenAddModal: () => void     
}

function ChatSidebar({chats, activeChat, onOpenAddModal, onSelectChat}: Props) {

  const handleChangeChat = (chat: Chat) => {
    onSelectChat(chat.chatId)
  }

  return (
    <aside className="chat-sidebar" aria-label="Список чатов">
      <div className="chat-sidebar-heading">
        <h1>Чаты</h1>
        <button className="chat-add-button" type="button" onClick={onOpenAddModal}>
          <span aria-hidden="true">+</span>
          Добавить
        </button>
      </div>

      <div className="chat-list">
        {chats.length === 0 ? (
          <p className="chat-list-empty">Добавьте чат, чтобы начать переписку</p>
        ) : (
          chats.map(chat => (
            <button
              key={chat.chatId}
              type="button"
              className={`chat-item ${activeChat === chat.chatId ? 'active' : ''}`}
              onClick={() => handleChangeChat(chat)}
            >
              {getChatName(chat, chat.chatId.split('@')[0])}
            </button>
          ))
        )}
      </div>
    </aside>
  )
}

export default memo(ChatSidebar)