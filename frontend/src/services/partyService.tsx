import { IPartyAllData, IPartyCreateData } from "@src/interfaces/IParty"
import { api, setTokenHeaders } from "@src/utils/config"

const getParty = async (id: string, token: string): Promise<IPartyCreateData> => {
  setTokenHeaders(token)
  const res: IPartyCreateData = await api.get(`/party/${id}`)
  return res
}

const getAllParties = async (token: string): Promise<IPartyAllData> => {
  setTokenHeaders(token)
  const res: IPartyAllData = await api.get('/party')
  return res
}

const partyService = {
  getParty,
  getAllParties,
}

export default partyService
