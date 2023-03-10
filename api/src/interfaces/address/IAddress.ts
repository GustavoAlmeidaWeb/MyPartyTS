import { Types } from 'mongoose'

export interface IAddress {
  name: string
  zipcode: string
  street: string
  number: string
  neighborhood: string
  city: string
  province: string
  adjunt?: string
  map?: string
  user_id: Types.ObjectId
}

export interface IAddressPaginateParams {
  page: number
  skip: number
  take: number
  user_id: Types.ObjectId
}

export interface IAddressPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: IAddress[]
}

export interface IDeleteAddress {
  user_id: Types.ObjectId
  id: string
}
