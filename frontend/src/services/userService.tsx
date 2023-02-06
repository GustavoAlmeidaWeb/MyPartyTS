import { IUserRegister } from '../interfaces/IUser'
import { api, setTokenHeaders } from '../utils/config'

const getUser = async (token: string): Promise<IUserRegister> => {
  setTokenHeaders(token)
  const res: IUserRegister = await api.get('/users')
  return res
}

const updateUser = async (
  token: string,
  updateUser: FormData,
): Promise<IUserRegister> => {
  setTokenHeaders(token)
  const res: IUserRegister = await api.put('/users/update', updateUser)
  return res
}

const deleteUser = async (token: string): Promise<void> => {
  setTokenHeaders(token)
  await api.delete('/users/delete')
}

const userService = {
  getUser,
  updateUser,
  deleteUser,
}

export default userService
