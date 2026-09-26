import { useState } from 'react'
import { saveCredentials } from '../auth/authUtils'

function LoginPage() {
  const [idInstance, setidInstance] = useState('')
  const [apiToken, setApiToken] = useState('')

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!idInstance.trim() || !apiToken.trim()) return

    saveCredentials({
      idInstance: idInstance.trim(),
      apiToken: apiToken.trim(),
    })

    
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-labelledby="login-title">
        <div className="brand">
          <img className="brand-mark" aria-hidden="true" src="https://console.green-api.com/assets_1.6.10/header-logo.63258f23.svg" alt="Green API Chat" />
          <span>green api chat</span>
        </div>

        <div className="login-card">
          <h1 id="login-title">Вход в чат</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="instance-id">ID инстанса</label>
              <input
                id="instance-id"
                name="instance-id"
                type="text"
                placeholder="1101000000"
                value={idInstance}
                onChange={(e) => setidInstance(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="api-token">API Token</label>
              <input
                id="api-token"
                name="api-token"
                type="password"
                placeholder="Введите токен"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
              />
            </div>

            <button className="login-submit" type="submit">
              Войти в чат
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage