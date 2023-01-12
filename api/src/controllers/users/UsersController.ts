import { Request, Response } from 'express'
import { IUpdateUser } from '@interfaces/users/IUsers'
import { registerUseCase } from './RegisterUseCase'
import { loginUseCase } from './LoginUseCase'
import { deleteUseCase } from './DeleteUseCase'
import { findUseCase } from './FindUseCase'
import { findAllUseCase } from './FindAllUseCase'
import { updateUseCase } from './UpdateUseCase'

export const userController = {
  /*
   * Controller Responsável pelo registro de um novo usuário
   */
  register: async (req: Request, res: Response): Promise<Response> => {
    const { name, email, phone, password, image } = req.body

    const user = await registerUseCase({
      name,
      email,
      phone,
      password,
      image,
    })

    return res.status(user.status).json(user.json)
  },

  /*
   * Controller Responsável pelo login de usuário
   */
  login: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body

    const login = await loginUseCase({ email, password })

    return res.status(login.status).json(login.json)
  },

  /*
   * Controller Responsável pela exclusão da conta de usuário
   */
  delete: async (req: Request, res: Response): Promise<Response> => {
    const { user } = req

    const remove = await deleteUseCase(user ? user._id : null)

    return res.status(remove.status).json(remove.json)
  },

  /*
   * Controller Responsável por buscar as informações do usuário autenticado
   */
  find: async (req: Request, res: Response): Promise<Response> => {
    const { user } = req

    const data = await findUseCase(user ? user._id : null)

    return res.status(data.status).json(data.json)
  },

  /*
   * Controller Responsável por buscar todos os usuários registrados
   */
  findAll: async (req: Request, res: Response): Promise<Response> => {
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1

    const limit =
      req.query.limit && Number(req.query.limit) ? Number(req.query.limit) : 10

    const take = limit
    const skip = (Number(page) - 1) * take

    const users = await findAllUseCase({ page, skip, take })

    return res.status(200).json(users)
  },

  /*
   * Controller Responsável por atualizar os dados do usuário
   */
  update: async (req: Request, res: Response): Promise<Response> => {
    const { user } = req
    const { name, phone } = req.body
    const data = <IUpdateUser>{ _id: user._id, name, phone }

    if (req.file) {
      data.image = req.file.filename
    }

    if (req.body.currentpassword) {
      data.currentpassword = req.body.currentpassword
      data.newpassword = req.body.newpassword
    }

    const update = await updateUseCase(data)

    return res.status(update.status).json(update.json)
  },
}
