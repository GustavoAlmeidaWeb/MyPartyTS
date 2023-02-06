import { IUserLogin, IUserRegister } from '@src/interfaces/IUser'
import { PayloadAction } from '@reduxjs/toolkit'

/*
 * AUTH TYPES
 */

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

export type UpdateType = {
  name: string
  phone: string
  image?: File | Blob | MediaSource
}

export type AuthInitialType = {
  user: IUserRegister | IUserLogin | PayloadAction | object
  error: any
  success: boolean
  loading: boolean
  message: string
}
