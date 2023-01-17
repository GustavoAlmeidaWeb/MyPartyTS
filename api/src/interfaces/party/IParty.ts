import { ICreateService } from '@interfaces/service/IService'
import { Types } from 'mongoose'

export interface ICreateParty {
  user_id: Types.ObjectId
  title: string
  author: string
  description: string
  budget: number
  image?: string
  services?: ICreateService[]
}

export interface IUpdateParty extends ICreateParty {
  id: string
}

export interface IDeleteParty {
  user_id: Types.ObjectId
  id: string
}

export interface IPaginateParams {
  page: number
  skip: number
  take: number
}

export interface IPartyPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: ICreateParty[]
}
