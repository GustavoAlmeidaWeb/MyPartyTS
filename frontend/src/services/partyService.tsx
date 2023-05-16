import { IPartyAllData, IPartyCreateData, IPartyDeleteData } from '@src/interfaces/IParty'
import { IPageParams } from '@src/interfaces/IService'
import { api } from '@src/utils/config'

const getParty = async (id: string): Promise<IPartyCreateData> => {
  const res: IPartyCreateData = await api.get(`/party/${id}`)
  return res
}

const getAllParties = async ({ limit, page }: IPageParams): Promise<IPartyAllData> => {
  const res: IPartyAllData = await api.get(`/party?limit=${limit || 10}&page=${page || 1}`)
  return res
}

const createParty = async (partyData: FormData): Promise<IPartyCreateData> => {
  const res: IPartyCreateData = await api.post('/party/create', partyData)
  return res
}

const deleteParty = async (id: string): Promise<IPartyDeleteData> => {
  const res: IPartyDeleteData = await api.delete(`/party/${id}`)
  return res
}

const partyService = {
  getParty,
  getAllParties,
  createParty,
  deleteParty,
}

export default partyService
