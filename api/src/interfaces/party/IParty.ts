import { ICreateService } from '@interfaces/service/IService'

export interface ICreateParty {
  title: string
  author: string
  description: string
  budget: number
  image?: string
  services?: ICreateService[]
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
