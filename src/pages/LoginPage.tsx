import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

function LoginPage() {
  const [idInstance, setidInstance] = useState('')
  const [apiToken, setApiToken] = useState('')
  const login = useLogin()

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!idInstance.trim() || !apiToken.trim()) return

    login.mutate({
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
            
            {login.isError && (
              <div className="login-error">
                {login.error.message.includes('403')
                  ? 'Неверный ID инстанса или API Token'
                  : login.error.message.includes('401')
                  ? 'Неверный API Token'
                  : 'Ошибка подключения'}
              </div>
            )}

            <button className="login-submit" type="submit" disabled={login.isPending}>
              Войти в чат
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage