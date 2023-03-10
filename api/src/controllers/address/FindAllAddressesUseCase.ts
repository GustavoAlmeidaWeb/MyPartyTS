import { AddressModel } from '@models/Address/Address'
import {
  IAddressPaginateParams,
  IAddressPaginateProperties,
} from '@interfaces/address/IAddress'

export const findAllAddressesUseCase = async ({
  page,
  skip,
  take,
  user_id,
}: IAddressPaginateParams): Promise<IAddressPaginateProperties> => {
  const addresses = await AddressModel.find({ user_id }).skip(skip).limit(take)
  const count = await AddressModel.find({ user_id }).countDocuments()

  const result = {
    per_page: take,
    total: count,
    current_page: page,
    data: addresses,
  }

  return result
}
