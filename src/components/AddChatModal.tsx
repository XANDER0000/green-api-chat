import { useState } from 'react'
import { normalizePhone, isValidPhone } from '../utils/phone.ts'
import { useChatStore } from '../store/useChatStore';
import type { Chat } from '../types/chat.ts';

interface Props {
  chats: Chat[],
  onClose: () => void
}

function AddChatModal({chats, onClose}: Props) {
  const [modalError, setModalError] = useState('')
  const [chatNumber, setChatNumber] = useState('')
  const addChat = useChatStore(s => s.addChat)

  const handleModalClose = () => {
    onClose();
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
    onClose()
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+\s()-]/g, '')
    setChatNumber(value)
  }
  
  return (
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
  )
}

export default AddChatModal