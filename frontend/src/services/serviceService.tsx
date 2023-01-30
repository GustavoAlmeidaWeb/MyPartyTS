import { IServiceCreateData, IServicesAllData } from "@src/interfaces/IService"
import { api, setTokenHeaders } from "../utils/config"

const getService = async (id: string, token: string): Promise<IServiceCreateData> => {
  setTokenHeaders(token)
  const res: IServiceCreateData = await api.get(`/services/${id}`)
  return res
}

const getAllServices = async (token: string): Promise<IServicesAllData> => {
  setTokenHeaders(token)
  const res: IServicesAllData = await api.get('/services')
  return res
}

const serviceService = {
  getService,
  getAllServices,
}

export default serviceService
