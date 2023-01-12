import { generateToken } from '@helpers/generate-token'
import { ILoginUser } from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'
import { compare } from 'bcryptjs'

export const loginUseCase = async ({
  email,
  password,
}: ILoginUser): Promise<Response | any> => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    return { status: 404, json: { errors: ['Usuário não encontrado.'] } }
  }

  if (!(await compare(password, user.password))) {
    return { status: 401, json: { errors: ['Senha incorreta.'] } }
  }

  try {
    return { status: 200, json: { token: generateToken(user._id) } }
  } catch (error) {
    return {
      status: 422,
      json: { errors: ['Houve algum problema, por favor tente mais tarde.'] },
    }
  }
}
