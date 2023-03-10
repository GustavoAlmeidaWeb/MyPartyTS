import { IAddress } from '@interfaces/address/IAddress'
import { AddressModel } from '@models/Address/Address'

type ResponseType = {
  status: number
  json: IAddress | Errors
}

type Errors = {
  errors: string[]
}

export const findAddressUseCase = async (id: string): Promise<ResponseType> => {
  try {
    const address = await AddressModel.findById(id)

    if (!address) {
      return { status: 404, json: { errors: ['Endereço não encontrado.'] } }
    }

    return { status: 200, json: address }
  } catch (e) {
    return {
      status: 422,
      json: {
        errors: ['Houve algum problema na requisição, tente mais tarde.'],
      },
    }
  }
}
