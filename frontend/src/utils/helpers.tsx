import { AxiosError } from 'axios'

const formatMoney = (num: number): string => {
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatDate = (dt: Date): string => {
  return new Date(dt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

const invalidToken = (err: AxiosError<any, any>): void => {
  if (err.response.status === 401 && err.response.data.errors[0] === 'INVALID_TOKEN') {
    localStorage.removeItem('myparty')
    location.reload()
  }
}

export { formatMoney, formatDate, invalidToken }
