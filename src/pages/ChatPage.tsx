import { useState } from 'react'
import Header from '../components/Header'

function ChatPage() {
  const [isAddChatOpen, setIsAddChatOpen] = useState(false)

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
            <p className="chat-list-empty">Добавьте чат, чтобы начать переписку</p>
          </div>
        </aside>

        <section className="chat-content" aria-label="Переписка">
          <div className="chat-welcome-mark" aria-hidden="true">
            <img src="https://console.green-api.com/assets_1.6.10/header-logo.63258f23.svg" alt="" />
          </div>
          <h2>Выберите чат</h2>
          <p>Переписка появится здесь</p>
        </section>
      </div>

      {isAddChatOpen && (
        <div className="chat-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsAddChatOpen(false)
        }}>
          <section className="chat-modal" role="dialog" aria-modal="true" aria-labelledby="add-chat-title">
            <div className="chat-modal-heading">
              <div>
                <h2 id="add-chat-title">Добавить чат</h2>
                <p>Введите токен для подключения</p>
              </div>
              <button className="chat-modal-close" type="button" aria-label="Закрыть" onClick={() => setIsAddChatOpen(false)}>
                &times;
              </button>
            </div>
            <form className="chat-add-form" onSubmit={(event) => event.preventDefault()}>
              <div className="field">
                <label htmlFor="chat-api-token">API Token</label>
                <input id="chat-api-token" name="api-token" type="password" placeholder="Введите токен" autoComplete="off" />
              </div>
              <div className="chat-modal-actions">
                <button className="chat-cancel-button" type="button" onClick={() => setIsAddChatOpen(false)}>Отмена</button>
                <button className="login-submit" type="submit">Добавить</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default ChatPage