import axios, { AxiosInstance } from 'axios'

export const uploads = import.meta.env.VITE_API_UPLOADS

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const cep: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CEP_URL,
})

export const setTokenHeaders = (token: string): void => {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}
