import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const setTokenHeaders = (token: string): void => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
