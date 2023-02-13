import { IPageParams, IServiceCreateData, IServiceDeleteData, IServicesAllData } from '@src/interfaces/IService'
import { api, setTokenHeaders } from '../utils/config'

const getService = async (id: string, token: string): Promise<IServiceCreateData> => {
  setTokenHeaders(token)
  const res: IServiceCreateData = await api.get(`/services/${id}`)
  return res
}

const getAllServices = async (token: string, { limit, page }: IPageParams): Promise<IServicesAllData> => {
  setTokenHeaders(token)
  const res: IServicesAllData = await api.get(`/services?limit=${limit || 10}&page=${page || 1}`)
  return res
}

const createService = async (data: FormData, token: string) => {
  setTokenHeaders(token)
  const res: IServiceCreateData = await api.post('/services/create', data)
  return res
}

const updateService = async (data: FormData, token: string) => {
  setTokenHeaders(token)
  const res: IServiceCreateData = await api.put(`/services/${data.get('_id')}`, data)
  return res
}

const deleteService = async (id: string, token: string): Promise<IServiceDeleteData> => {
  setTokenHeaders(token)
  const res: IServiceDeleteData = await api.delete(`/services/${id}`)
  return res
}

const serviceService = {
  getService,
  getAllServices,
  createService,
  updateService,
  deleteService,
}

export default serviceService
