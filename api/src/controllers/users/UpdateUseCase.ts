import { compare, hash } from 'bcryptjs'
import { IUpdateUser } from '@interfaces/users/IUsers'
import { UserModel } from '@models/User/User'
import { imageUrlGenerate } from '@helpers/image-url-generate'
import { deleteImageDirectory } from '@helpers/delete-image-directory'

type ResponseType = {
  status: number
  json: IUpdateUser | Errors
}

type Errors = {
  errors: string[]
}

export const updateUseCase = async ({
  _id,
  name,
  phone,
  currentpassword,
  newpassword,
  image = null,
}: IUpdateUser): Promise<ResponseType> => {
  let oldImage: string = null
  const user = await UserModel.findById(_id)

  if (!user) {
    return { status: 404, json: { errors: ['Usuário não encontrado.'] } }
  }

  user.name = name
  user.phone = phone

  if (image) {
    if (user.image) {
      oldImage = user.image
    }
    user.image = image
  }

  if (currentpassword) {
    if (!(await compare(currentpassword, user.password))) {
      return {
        status: 401,
        json: { errors: ['A sua senha atual está incorreta.'] },
      }
    }

    const hashpass = await hash(newpassword, 12)

    user.password = hashpass
  }

  await user.save()

  if (oldImage) {
    await deleteImageDirectory(imageUrlGenerate(`/users/${oldImage}`))
  }

  return { status: 200, json: user }
}
