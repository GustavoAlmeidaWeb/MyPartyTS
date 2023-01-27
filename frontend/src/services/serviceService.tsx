import { ServicesArrayType } from "@src/@types/ServiceTypes"
import { api, setTokenHeaders } from "../utils/config"

const getService = async (id: string, token: string) => {
  setTokenHeaders(token)
  const { data } = await api.get(`/services/${id}`)
  return data
}

const getAllServices = async (token: string): Promise<ServicesArrayType> => {
  setTokenHeaders(token)
  const { data } = await api.get('/services')
  return data
}

const serviceService = {
  getService,
  getAllServices,
}

export default serviceService
