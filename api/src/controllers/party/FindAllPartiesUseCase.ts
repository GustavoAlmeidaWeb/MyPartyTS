import { PartyModel } from '@models/Party/Party'
import {
  IPaginateParams,
  IPartyPaginateProperties,
} from '@interfaces/party/IParty'

export const findAllPartiesUseCase = async ({
  page,
  skip,
  take,
}: IPaginateParams): Promise<IPartyPaginateProperties> => {
  const parties = await PartyModel.find().skip(skip).limit(take)
  const count = await PartyModel.countDocuments()

  const result = {
    per_page: take,
    total: count,
    current_page: page,
    data: parties,
  }

  return result
}
