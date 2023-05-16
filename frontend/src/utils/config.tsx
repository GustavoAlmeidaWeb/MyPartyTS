import axios, { AxiosInstance } from 'axios'
import { getTokenFromLocalStorage } from './helpers'
import authService from '@src/services/authService'

export const uploads = import.meta.env.VITE_API_UPLOADS

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const cep: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CEP_URL,
})

// Axios Interceptors Request
api.interceptors.request.use(
  async config => {
    if (config.url) {
      if (config.url.includes('/login') || config.url.includes('/register')) {
        return config
      }
    }

    const token: string = getTokenFromLocalStorage()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  async error => {
    return Promise.reject(error)
  },
)

// Axios Interceptors Response
api.interceptors.response.use(
  async res => {
    return res
  },
  async error => {
    if (error.response) {
      if (error.response.status === 400 && error.response.data.errors[0] === 'INVALID_TOKEN') {
        await authService.logout()
      }
    }
    return Promise.reject(error)
  },
)
