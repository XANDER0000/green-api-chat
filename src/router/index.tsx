import { createBrowserRouter } from 'react-router-dom'
import { authLoader } from '../auth/authLoader'
// import { isAuthenticated } from '../auth/authUtils'
import LoginPage from '../pages/LoginPage'
import ChatPage from '../pages/ChatPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', loader: authLoader, element: <ChatPage /> },
])