import { baseUrl } from './client'
import type { Credentials, Message, Notification, DeleteResult } from '../types/greenApi'

// https://api.green-api.com/waInstance{idInstance}/getStateInstance/{apiToken}

export async function getStateInstance(credentials: Credentials): Promise<{ stateInstance: string }> {
  const response = await baseUrl.get(`/waInstance${credentials.idInstance}/getStateInstance/${credentials.apiToken}`);
  return response.data;
}

export async function sendMessage(credentials: Credentials, payload: Message): Promise<string> {
  const response = await baseUrl.post(`/waInstance${credentials.idInstance}/sendMessage/${credentials.apiToken}`, payload);
  return response.data;
}

export async function receiveNotification(credentials: Credentials): Promise<Notification | null> {
  const response = await baseUrl.get(`/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiToken}?receiveTimeout=7`);
  return response.data;
}

export async function deleteNotification(credentials: Credentials, receiptId: number): Promise<DeleteResult>  {
  const response = await baseUrl.delete(`/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiToken}/${receiptId}`);
  return response.data;
}