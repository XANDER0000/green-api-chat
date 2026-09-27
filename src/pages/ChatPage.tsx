import { useState } from 'react'
import Header from '../components/ChatHeader.tsx'
import ChatSidebar from '../components/ChatSidebar.tsx';
import { useChatStore } from '../store/useChatStore';
import { getCredentials } from '../auth/authUtils';
import { useReceiveMessages } from '../hooks/useReceiveMessages.ts';
import { getChatName } from '../utils/chat'
import ChatConversation from '../components/ChatConversation.tsx';
import AddChatModal from '../components/AddChatModal.tsx';

function ChatPage() {
  const credentials = getCredentials()
  useReceiveMessages(credentials)

  const [isAddChatOpen, setIsAddChatOpen] = useState(false)

  const chats = useChatStore(s => s.chats)
  const activeChat = useChatStore(s => s.activeChat)
  const setActiveChat = useChatStore(s => s.setActiveChat)



  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId)
  }

  const activeChatData = chats.find(c => c.chatId === activeChat)
  const displayName = getChatName(activeChatData, activeChat?.split('@')[0] || '')
  
  return (
    <main className="chat-page">
      <Header />

      <div className="chat-layout">
        <ChatSidebar 
          chats={chats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          onOpenAddModal={() => setIsAddChatOpen(true)}
        />

        <section className={`chat-content ${activeChat ? 'has-active-chat' : ''}`} aria-label="Переписка">
          {activeChat ? (
           <ChatConversation key={activeChat} chatId={activeChat} chatName={displayName}/>
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
        <AddChatModal chats={chats} onClose={() => setIsAddChatOpen(false)}/>
      )}
    </main>
  )
}

export default ChatPage