import { AxiosResponse } from "axios"

export interface IServiceCreate {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  errors?: string[]
}

export interface IServiceDelete {
  message?: string
  errors?: string[]
}

export interface IServiceDeleteData {
  data: IServiceDelete
}

export interface IServiceCreateData {
  data: IServiceCreate
}

export interface IServicesAll {
  current_page: number
  total: number
  per_page: number
  data: IServiceCreate[]
}
export interface IServicesAllData {
  data: IServicesAll
}

export interface ServiceInitialInterface {
  service: IServiceCreate | object
  services: IServicesAll | AxiosResponse<[]> | object
  error: any
  success: boolean
  loading: boolean
  message: string
}

export interface IServiceDataForm {
  name: string
  description: string
  price: number
  _id?: string
  image?: File | Blob | MediaSource
}

export interface IPageParams {
  limit: number
  page: number
}
