export interface IServiceCreate {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  errors?: string[]
}

export interface IServicesAll {
  current_page: number
  total: number
  per_page: number
  data: IServiceCreate[]
}
