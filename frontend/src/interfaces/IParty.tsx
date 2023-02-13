import { AxiosResponse } from 'axios'
import { IServiceCreate } from './IService'

export interface IPartyCreate {
  title: string
  author: string
  description: string
  budget: number
  services?: IServiceCreate[]
  user_id?: string
  image?: string | File | Blob | MediaSource
  _id?: string
}

export interface IPartyCreateData {
  data: IPartyCreate
}

export interface IPartyAll {
  per_page: number
  total: number
  current_page: number
  data: IPartyCreate[]
}

export interface IPartyAllData {
  data: IPartyAll
}

export interface PartyInitialInterface {
  party: IPartyCreate | object
  parties: IPartyAll | object
  error: any
  success: boolean
  loading: boolean
  message: string
}

export interface IPartyDelete {
  message?: string
  errors?: string[]
}

export interface IPartyDeleteData {
  data: IPartyDelete
}
