import { ServiceModel } from '@models/Service/Service'
import { IUpdateService } from '@interfaces/service/IService'
import { imageUrlGenerate } from '@helpers/image-url-generate'
import { deleteImageDirectory } from '@helpers/delete-image-directory'

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
  user_id,
}: IUpdateService): Promise<ResponseType> => {
  let oldImage: string = null
  const service = await ServiceModel.findById(id)
  service.name = name
  service.description = description
  service.price = price

  if (image) {
    if (service.image) {
      oldImage = service.image
    }
    service.image = image
  }

  try {
    if (!service.user_id.equals(user_id)) {
      return {
        status: 401,
        json: {
          errors: ['Você não tem permissão para executar essa ação.'],
        },
      }
    }

    await service.save()
    await deleteImageDirectory(imageUrlGenerate(`/services/${oldImage}`))

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
