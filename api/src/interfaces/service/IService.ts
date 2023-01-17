import { Types } from 'mongoose'

export interface ICreateService {
  user_id: Types.ObjectId
  name: string
  description: string
  price: number
  image?: string
}

export interface IUpdateService extends ICreateService {
  id: string
}

export interface IPaginateParams {
  page: number
  skip: number
  take: number
}

export interface IServicesPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: ICreateService[]
}
