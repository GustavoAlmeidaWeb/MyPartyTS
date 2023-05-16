import { IUserRegister } from '../interfaces/IUser'
import { api } from '../utils/config'

const getUser = async (): Promise<IUserRegister> => {
  const res: IUserRegister = await api.get('/users')
  return res
}

const updateUser = async (updateUser: FormData): Promise<IUserRegister> => {
  const res: IUserRegister = await api.put('/users/update', updateUser)
  return res
}

const deleteUser = async (): Promise<void> => {
  await api.delete('/users/delete')
}

const userService = {
  getUser,
  updateUser,
  deleteUser,
}

export default userService
