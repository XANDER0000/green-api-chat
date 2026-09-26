import { redirect } from 'react-router-dom'
import { getCredentials } from './authUtils'

export function authLoader() {
  const credentials = getCredentials()
  
  if (!credentials) {
    throw redirect('/login')
  }
  
  return { credentials }
}