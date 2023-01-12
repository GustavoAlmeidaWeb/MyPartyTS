import { UserModel } from '@models/User/User'
import { Types } from 'mongoose'

export const findUseCase = async (
  id: Types.ObjectId | null,
): Promise<Response | any> => {
  if (!id) {
    return { status: 404, json: { errors: ['Usuário não encontrado.'] } }
  }

  const user = await UserModel.findById(id)

  return { status: 200, json: user }
}
