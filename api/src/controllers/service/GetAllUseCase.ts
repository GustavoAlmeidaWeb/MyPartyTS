import {
  IPaginateParams,
  IServicesPaginateProperties,
} from '@interfaces/service/IService'
import { ServiceModel } from '@models/Service/Service'

export const getAllServicesUseCase = async ({
  page,
  skip,
  take,
  user_id,
}: IPaginateParams): Promise<IServicesPaginateProperties> => {
  const services = await ServiceModel.find({ user_id }).skip(skip).limit(take)

  const count = await ServiceModel.find({ user_id }).countDocuments()

  const result = {
    per_page: take,
    total: count,
    current_page: page,
    data: services,
  }

  return result
}
