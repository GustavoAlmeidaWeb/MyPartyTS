import { IAddressAllData, IAddressCreate, IAddressCreateData, IAddressDeleteData } from '@src/interfaces/IAddress'
import { IPageParams } from '@src/interfaces/IService'
import { api, cep } from '@src/utils/config'

const createAddressService = async (addressData: IAddressCreate): Promise<IAddressCreateData> => {
  const res: IAddressCreateData = await api.post('/address/create', addressData)
  return res
}

const deleteAddressService = async (id: string): Promise<IAddressDeleteData> => {
  const res: IAddressDeleteData = await api.delete(`/address/${id}`)
  return res
}

const findAddressService = async (id: string): Promise<IAddressCreateData> => {
  const res: IAddressCreateData = await api.get(`/address/${id}`)
  return res
}

const findAllAddressesService = async ({ limit, page }: IPageParams): Promise<IAddressAllData> => {
  const res: IAddressAllData = await api.get(`/address?limit=${limit || 10}&page=${page || 1}`)
  return res
}

const getAddressByCep = async (cepNum: string): Promise<any> => {
  const res = await cep.get(`/${cepNum}`)
  return res
}

const addressServices = {
  createAddressService,
  deleteAddressService,
  findAddressService,
  findAllAddressesService,
  getAddressByCep,
}

export default addressServices
