import { AddressModel } from '@models/Address/Address'
import { IAddress } from '@interfaces/address/IAddress'

type ResponseType = {
  status: number
  json: IAddress | Errors
}

type Errors = {
  errors: string[]
}

export const createAddressUseCase = async ({
  name,
  zipcode,
  street,
  number,
  neighborhood,
  city,
  province,
  adjunt,
  map,
  user_id,
}: IAddress): Promise<ResponseType> => {
  try {
    const address = await AddressModel.create({
      name,
      zipcode,
      street,
      number,
      neighborhood,
      city,
      province,
      adjunt,
      map,
      user_id,
    })

    return { status: 201, json: address }
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
