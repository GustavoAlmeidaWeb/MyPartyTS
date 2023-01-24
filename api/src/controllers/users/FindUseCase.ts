import { ICreateUser } from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'
import { Types } from 'mongoose'

type ResponseType = {
  status: number
  json: ICreateUser | Errors
}

type Errors = {
  errors: string[]
}

export const findUseCase = async (
  id: Types.ObjectId | null,
): Promise<ResponseType> => {
  if (!id) {
    return { status: 404, json: { errors: ['Usuário não encontrado.'] } }
  }

  const user = await UserModel.findById(id).select(['-password'])

  return { status: 200, json: user }
}
