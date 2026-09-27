# Green API Chat

Веб-интерфейс для отправки и получения сообщений через [GREEN-API](https://green-api.com) (MAX/WhatsApp/Telegram).

## 🚦 Запуск локально

```bash
git clone <repo-url>
cd green-api-chat
npm install
npm run dev
```

## 📸 Скриншоты

### Вход
![Login](screenshots/page-login.png)

### Модалка
![Chat List](screenshots/page-chat-modal.png)

### Переписка
![Conversation](screenshots/page-chat-messages.png)

## ✨ Функционал

- Авторизация по `idInstance` + `apiToken` от GREEN-API
- Добавление чатов по номеру телефона
- Отправка текстовых сообщений
- Получение входящих через long polling
- Автоматическое создание чата при входящем от нового контакта
- Отображение имени контакта

## 🛠 Стек

| Технология | Зачем |
|------------|-------|
| **React 19** + TypeScript | UI |
| **Vite** | Сборка |
| **React Router v7** | Роутинг + loaders (auth) |
| **TanStack Query** | Мутации (sendMessage, getStateInstance) |
| **Zustand** | Глобальный стейт (чаты, сообщения) |
| **Axios** | HTTP-клиент с интерсепторами |
| **Stylus** | Стили |

## 🔑 Ключевые решения

### Роутинг с защитой через loader
Проверка авторизации происходит **до рендера** компонента через `authLoader`. Если credentials нет — `throw redirect('/login')`.

### Long polling для получения сообщений
GREEN-API не поддерживает WebSocket. Сообщения приходят через `receiveNotification` с `receiveTimeout`. Используется **рекурсивный `setTimeout`** (не `setInterval`) — защита от наложения запросов.

### Оптимистичное обновление
Отправленные сообщения **сразу** попадают в UI через `onSuccess` в `useMutation` + `addMessage` в Zustand.

### Дедупликация
В `addMessage` проверка по `id` — защита от повторных уведомлений.

### CORS
В dev используется **Vite Proxy** — запросы к GREEN-API идут через dev-сервер.
