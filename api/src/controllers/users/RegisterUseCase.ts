import { ICreateUser } from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'
import { hash } from 'bcryptjs'

export const registerUseCase = async ({
  name,
  email,
  phone,
  password,
  image,
}: ICreateUser): Promise<Response | any> => {
  const userExists = await UserModel.findOne({ email })

  if (userExists) {
    return { status: 401, json: { errors: ['Utilize outro e-mail.'] } }
  }

  try {
    const passHash = await hash(password, 12)
    const user = await UserModel.create({
      name,
      email,
      phone,
      password: passHash,
      image,
    })
    return { status: 201, json: user }
  } catch (error) {
    return {
      status: 401,
      json: { errors: ['Houve algum problema, por favor tente mais tarde.'] },
    }
  }
}
