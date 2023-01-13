export interface ICreateService {
  name: string
  description: string
  price: number
  image?: string
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

export interface IUpdateService {
  id: string
  name: string
  description: string
  price: number
  image: string
}
