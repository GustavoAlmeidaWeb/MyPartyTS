import { ServiceModel } from '@models/Service/Service'
import { ICreateService } from '@interfaces/service/IService'

type ResponseType = {
  status: number
  json: ICreateService | Errors
}

type Errors = {
  errors: string[]
}

export const createServiceUseCase = async ({
  name,
  description,
  price,
  image,
  user_id,
}: ICreateService): Promise<ResponseType> => {
  const data = <ICreateService>{ name, description, price, user_id }

  data.image = image || null

  try {
    const service = await ServiceModel.create(data)
    return { status: 201, json: service }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: [
          'Houve algum problema na requisição, por favor tente mais tarde.',
        ],
      },
    }
  }
}
