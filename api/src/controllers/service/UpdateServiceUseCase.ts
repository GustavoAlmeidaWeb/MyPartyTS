import { IUpdateService } from '@interfaces/service/IService'
import { ServiceModel } from '@models/Service/Service'

type ResponseType = {
  status: number
  json: IUpdateService | Errors
}

type Errors = {
  errors: string[]
}

export const updateServiceUseCase = async ({
  id,
  name,
  description,
  price,
  image,
}: IUpdateService): Promise<ResponseType> => {
  const service = await ServiceModel.findById(id)
  service.name = name
  service.description = description
  service.price = price
  service.image = image

  try {
    await service.save()
    return { status: 200, json: service }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: ['Houve algum problema na requisição, tente mais tarde.'],
      },
    }
  }
}
