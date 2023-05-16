import { IPageParams, IServiceCreateData, IServiceDeleteData, IServicesAllData } from '@src/interfaces/IService'
import { api } from '../utils/config'

const getService = async (id: string): Promise<IServiceCreateData> => {
  const res: IServiceCreateData = await api.get(`/services/${id}`)
  return res
}

const getAllServices = async ({ limit, page }: IPageParams): Promise<IServicesAllData> => {
  const res: IServicesAllData = await api.get(`/services?limit=${limit || 10}&page=${page || 1}`)
  return res
}

const createService = async (data: FormData) => {
  const res: IServiceCreateData = await api.post('/services/create', data)
  return res
}

const updateService = async (data: FormData) => {
  const res: IServiceCreateData = await api.put(`/services/${data.get('_id')}`, data)
  return res
}

const deleteService = async (id: string): Promise<IServiceDeleteData> => {
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
