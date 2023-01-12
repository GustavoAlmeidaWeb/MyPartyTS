import {
  IPaginateParams,
  IUsersPaginateProperties,
} from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'

export const findAllUseCase = async ({
  page,
  skip,
  take,
}: IPaginateParams): Promise<IUsersPaginateProperties> => {
  const users = await UserModel.find()
    .select('-password')
    .skip(skip)
    .limit(take)

  const count = await UserModel.countDocuments()

  const result = {
    per_page: take,
    total: count,
    current_page: page,
    data: users,
  }

  return result
}
