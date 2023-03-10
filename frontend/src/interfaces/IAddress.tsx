export interface IAddressCreate {
  name: string
  zipcode: string
  street: string
  number: string
  neighborhood: string
  city: string
  province: string
  adjunt: string
  map: string
  user_id?: string
}

export interface IAddressCreateData {
  data: IAddressCreate
}

export interface IAddressDelete {
  message?: string
  errors?: string[]
}

export interface IAddressDeleteData {
  data: IAddressDelete
}

export interface IAddressAll {
  per_page: number
  total: number
  current_page: number
  data: IAddressCreate[]
}

export interface IAddressAllData {
  data: IAddressAll
}

export interface AddressInitialInterface {
  address: IAddressCreate | object
  addresses: IAddressAll | object
  error: any
  success: boolean
  loading: boolean
  message: string
}
