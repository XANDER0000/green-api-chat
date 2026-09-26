import { useMutation } from "@tanstack/react-query";
import { getStateInstance } from '../api/greenApi'
import { saveCredentials } from '../auth/authUtils'
import { useNavigate } from 'react-router-dom'
import type { Credentials } from '../types/greenApi'

export function useLogin() { 
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const { stateInstance } = await getStateInstance(credentials)

      if (stateInstance !== 'authorized') {
        throw new Error('Инстанс не авторизован')
      }
      
      return stateInstance
    },
    
    onSuccess: (stateInstance, credentials) => {      
      saveCredentials(credentials)
      navigate('/')
    },

    onError: (error) => {
      console.error('Ошибка входа:', error)
    },
  })

  return { ...mutation }
}