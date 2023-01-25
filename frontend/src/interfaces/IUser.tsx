/*
 * INTERFACES AUTH MODULE (lOGIN AND REGISTER)
 */

export interface IUserRegister {
  data: {
    _id: string
    name: string
    email: string
    phone: string
    password: string
    image: string
    token?: string
    errors?: string[]
  }
}

export interface IUserLogin {
  data: {
    token?: string
    errors?: string[]
  }
}
