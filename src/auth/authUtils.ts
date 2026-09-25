import type { Credentials } from '../types/greenApi'
import { STORAGE_KEY } from '../constants/greenApi'

export const saveCredentials = (credentials: Credentials): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
}

export const getCredentials = (): Credentials | null => {
  const store = localStorage.getItem(STORAGE_KEY)
  if (!store) return null
  
  try {
    const parsed = JSON.parse(store)
    if (typeof parsed?.idInstance !== 'string' || typeof parsed?.apiToken !== 'string') {
      return null
    }
    return parsed as Credentials
  } catch {
    return null
  }
}

export const clearCredentials = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export const isAuthenticated = () => {
  return getCredentials() !== null
}