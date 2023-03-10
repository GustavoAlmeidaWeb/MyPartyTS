import { IDeleteAddress } from '@interfaces/address/IAddress'
import { AddressModel } from '@models/Address/Address'

type ResponseType = {
  status: number
  json: ErrorsOrMsg
}

type ErrorsOrMsg = {
  errors?: string[]
  message?: string
}

export const deleteAddressUseCase = async ({
  id,
  user_id,
}: IDeleteAddress): Promise<ResponseType> => {
  try {
    const address = await AddressModel.findById(id)

    if (!address) {
      return { status: 404, json: { errors: ['Endereço não encontrado.'] } }
    }

    if (!address.user_id.equals(user_id)) {
      return {
        status: 401,
        json: { errors: ['Você não tem permissão para executar essa ação.'] },
      }
    }

    await address.remove()

    return { status: 200, json: { message: 'Endereço excluído com sucesso.' } }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: ['Houve algum problema na requisição, tente mais tarde.'],
      },
    }
  }
}
