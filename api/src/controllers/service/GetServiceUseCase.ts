import { ServiceModel } from '@models/Service/Service'
import { ICreateService } from '@interfaces/service/IService'

type ResponseType = {
  status: number
  json: ICreateService | Errors
}

type Errors = {
  errors: string[]
}

export const getServiceUseCase = async (id: string): Promise<ResponseType> => {
  try {
    const service = await ServiceModel.findById(id)

    if (!service) {
      return {
        status: 404,
        json: { errors: ['Nenhum serviço encontrado.'] },
      }
    }

    return { status: 200, json: service }
  } catch (error) {
    return {
      status: 422,
      json: {
        errors: ['Houve algum problema na requisição, tente mais tarde.'],
      },
    }
  }
}
