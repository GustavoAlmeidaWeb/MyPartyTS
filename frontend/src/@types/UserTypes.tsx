import { IUserLogin, IUserRegister } from "../interfaces/IUser"
import { PayloadAction } from '@reduxjs/toolkit'

export type LoginType = {
  email: string
  password: string
}

export type RegisterType = {
  name: string
  email: string
  phone: string
  password: string
  confirmpassword: string
  image?: string
}

export type AuthInitialType = {
  user: IUserRegister | IUserLogin | PayloadAction
  error: any
  success: boolean
  loading: boolean
  message: string
}
