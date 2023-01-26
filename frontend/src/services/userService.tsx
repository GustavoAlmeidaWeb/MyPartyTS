import { IUserLogin, IUserRegister } from "../interfaces/IUser"
import { LoginType, RegisterType, UpdateType } from "../@types/UserTypes"
import { api, setTokenHeaders } from "../utils/config"

const getUser = async (token: string): Promise<IUserRegister> => {
  setTokenHeaders(token)
  const res: IUserRegister = await api.get('/users')
  return res
}

const updateUser = async (token: string, updateUser: FormData): Promise<IUserRegister> => {
  setTokenHeaders(token)
  const res: IUserRegister = await api.put('/users/update', updateUser)
  return res
}

const userService = {
  getUser,
  updateUser,
}

export default userService
