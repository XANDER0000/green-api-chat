import { useNavigate } from 'react-router-dom'
import { clearCredentials, getCredentials } from '../auth/authUtils'
import { memo } from 'react'

function Header() {
  const navigate = useNavigate()
  const credentials = getCredentials()

  const handleLogout = () => {
    clearCredentials()
    navigate('/login')
  }

  return (
    <header className="chat-topbar">
      <a className="chat-brand" href="/" aria-label="Green API Chat">
        <img src="https://console.green-api.com/assets_1.6.10/header-logo.63258f23.svg" alt="" />
        <span>green api chat</span>
      </a>

      <div className="chat-account">
        <span className="chat-instance">Инстанс <strong>{credentials?.idInstance ?? '—'}</strong></span>
        <button className="chat-logout" type="button" onClick={handleLogout}>Выйти</button>
      </div>
    </header>
  )
}

export default memo(Header)