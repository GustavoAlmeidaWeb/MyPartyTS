import { IServiceCreate, IServicesAll } from "@src/interfaces/IService"
import { AxiosResponse } from "axios"

export type ServiceInitialType = {
  service: IServiceCreate | object
  services: ServicesArrayType | AxiosResponse<[]> | object
  error: any
  success: boolean
  loading: boolean
  message: string
}

export type ServicesArrayType = {
  per_page: number
  total: number
  current_page: number
  data: IServiceCreate[]
}
