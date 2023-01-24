import { UserModel } from '@models/User/User'
import { Types } from 'mongoose'

type ResponseType = {
  status: number
  json: ErrorsOrMsg
}

type ErrorsOrMsg = {
  errors?: string[]
  message?: string
}

export const deleteUseCase = async (
  id: Types.ObjectId | null,
): Promise<ResponseType> => {
  if (!id) {
    return {
      status: 404,
      json: { errors: ['Usuário não encontrado.'] },
    }
  }

  const user = await UserModel.findById(id)

  if (!user) {
    return {
      status: 401,
      json: { errors: ['Você não tem permissão para executar essa ação.'] },
    }
  }

  try {
    await UserModel.findByIdAndDelete(user._id)
    return { status: 200, json: { message: 'Conta excluída com sucesso.' } }
  } catch (error) {
    return {
      status: 422,
      json: {
        errors: ['Houve algum problema na requisição, tente mais tarde.'],
      },
    }
  }
}
