import { ServiceModel } from '@models/Service/Service'
import { Types } from 'mongoose'

type ResponseType = {
  status: number
  json: ErrorsOrMsg
}

type ErrorsOrMsg = {
  errors?: string[]
  message?: string
}

export const deleteServiceUseCase = async (
  id: string,
  user_id: Types.ObjectId,
): Promise<ResponseType> => {
  try {
    const service = await ServiceModel.findById(id)

    if (!service) {
      return {
        status: 404,
        json: { errors: ['Serviço não encontrado.'] },
      }
    }

    if (!service.user_id.equals(user_id)) {
      return {
        status: 401,
        json: { errors: ['Você não tem permissão para executar essa ação.'] },
      }
    }

    await service.delete()

    return { status: 200, json: { message: 'Serviço excluído com sucesso.' } }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: [
          'Houve algum problema na requisição, tente novamente mais tarde.',
        ],
      },
    }
  }
}
