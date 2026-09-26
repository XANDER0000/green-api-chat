import { useState } from 'react'
import Header from '../components/Header'
import { useChatStore } from '../store/useChatStore';
import { normalizePhone, isValidPhone } from '../utils/phone.ts'
import type { Chat } from '../types/chat.ts'
import { useSendMessage } from '../hooks/useSendMessage.ts';
import { getCredentials } from '../auth/authUtils';

function ChatPage() {
  const credentials = getCredentials()
  const [isAddChatOpen, setIsAddChatOpen] = useState(false)
  const [chatNumber, setChatNumber] = useState('')
  const [modalError, setModalError] = useState('')

  const chats = useChatStore(s => s.chats)
  const setActiveChat = useChatStore(s => s.setActiveChat)
  const activeChat = useChatStore(s => s.activeChat)
  const addChat = useChatStore(s => s.addChat)

  const [message, setMessageInput] = useState('')
  const sendMessage = useSendMessage()
  const messages = useChatStore(s => s.messages)

  const handleModalClose = () => {
    setIsAddChatOpen(false);
    setModalError('');
  }

  const handleAddChat = (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!isValidPhone(chatNumber)) return

    const phone = normalizePhone(chatNumber)
    if (chats.find((item) => item.chatId === phone)) {
      setModalError('Чат с таким номером уже создан')
      return;
    } else {
      setModalError('')
    }
    addChat({
      chatId: phone,
      updatedAt: Date.now(),
    })

    setChatNumber('')
    setIsAddChatOpen(false)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+\s()-]/g, '')
    setChatNumber(value)
  }

  const handleChangeChat = (chat: Chat) => {
    setActiveChat(chat.chatId)
    setMessageInput('')
  }

  const handleSendMessage = () => {
    if (!credentials || !activeChat) return;
    sendMessage.mutate({ credentials, payload: { chatId: activeChat, message } });
    setMessageInput('')
  }
  
  return (
    <main className="chat-page">
      <Header />

      <div className="chat-layout">
        <aside className="chat-sidebar" aria-label="Список чатов">
          <div className="chat-sidebar-heading">
            <h1>Чаты</h1>
            <button className="chat-add-button" type="button" onClick={() => setIsAddChatOpen(true)}>
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
                  {chat.chatId}
                </button>
              ))
            )}
          </div>
        </aside>

        <section className={`chat-content ${activeChat ? 'has-active-chat' : ''}`} aria-label="Переписка">
          {activeChat ? (
            <div className="conversation">
              <header className="conversation-header">
                <div className="conversation-avatar" aria-hidden="true">{activeChat.slice(0, 1)}</div>
                <div>
                  <h2>{activeChat}</h2>
                  <p>Чат</p>
                </div>
              </header>
              <div className="conversation-messages" aria-label="Сообщения">
                {messages[activeChat]?.length ? (
                  messages[activeChat].map((chatMessage) => (
                    <div
                      key={chatMessage.id}
                      className={`message-row ${chatMessage.isOutgoing ? 'outgoing' : 'incoming'}`}
                    >
                      <div className="message-bubble">
                        <p>{chatMessage.text}</p>
                        <time dateTime={new Date(chatMessage.timestamp).toISOString()}>
                          {new Date(chatMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </time>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="conversation-empty">Сообщения появятся здесь</p>
                )}
              </div>
              <div className="message-composer">
                <input type="text" aria-label="Текст сообщения" placeholder="Введите сообщение" value={message} onChange={(e) => setMessageInput(e.target.value)} />
                <button className="message-send-button" type="button" aria-label="Отправить сообщение" onClick={() => handleSendMessage()} disabled={!message || sendMessage.isPending}>
                  <span aria-hidden="true">&#8593;</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="chat-welcome-mark" aria-hidden="true">
                <img src="https://console.green-api.com/assets_1.6.10/header-logo.63258f23.svg" alt="" />
              </div>
              <h2>Выберите чат</h2>
              <p>Переписка появится здесь</p>
            </>
          )}
        </section>
      </div>

      {isAddChatOpen && (
        <div className="chat-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) handleModalClose()
        }}>
          <section className="chat-modal" role="dialog" aria-modal="true" aria-labelledby="add-chat-title">
            <div className="chat-modal-heading">
              <div>
                <h2 id="add-chat-title">Добавить чат</h2>
                <p>Введите номер для подключения</p>
              </div>
              <button className="chat-modal-close" type="button" aria-label="Закрыть" onClick={() => handleModalClose()}>
                &times;
              </button>
            </div>
            <form className="chat-add-form" onSubmit={handleAddChat}>
              <div className="field">
                <label htmlFor="chat-number">Номер</label>
                <input
                  id="chat-number"
                  name="api-number"
                  type="tel"
                  placeholder="+7 999 123-45-67"
                  autoComplete="off"
                  inputMode="tel"
                  value={chatNumber}
                  onChange={handleNumberChange}
                />
              </div>
              {modalError && (
                <div className="login-error">
                  { modalError }
                </div>
              )}
              <div className="chat-modal-actions">
                <button className="chat-cancel-button" type="button" onClick={() => {handleModalClose()}}>Отмена</button>
                <button className="login-submit" type="submit" disabled={!isValidPhone(chatNumber)}>
                  Добавить
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default ChatPage