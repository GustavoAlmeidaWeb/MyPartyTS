import { Request, Response } from 'express'
import { ICreateService, IUpdateService } from '@interfaces/service/IService'
import { createServiceUseCase } from './CreateServiceUseCase'
import { deleteServiceUseCase } from './DeleteServiceUseCase'
import { getServiceUseCase } from './GetServiceUseCase'
import { getAllServicesUseCase } from './GetAllUseCase'
import { updateServiceUseCase } from './UpdateServiceUseCase'

export const serviceController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const data = <ICreateService>{
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      user_id: req.user._id,
    }

    req.file && (data.image = req.file.filename)

    const service = await createServiceUseCase(data)

    return res.status(service.status).json(service.json)
  },

  get: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const service = await getServiceUseCase(id)

    return res.status(service.status).json(service.json)
  },

  getAll: async (req: Request, res: Response): Promise<Response> => {
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1

    const limit =
      req.query.limit && Number(req.query.limit) ? Number(req.query.limit) : 10

    const take = limit
    const skip = (Number(page) - 1) * take

    const services = await getAllServicesUseCase({
      page,
      skip,
      take,
      user_id: req.user._id,
    })

    return res.status(200).json(services)
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const remove = await deleteServiceUseCase(req.params.id, req.user._id)

    return res.status(remove.status).json(remove.json)
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    const data = <IUpdateService>{
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
      user_id: req.user._id,
    }

    const service = await updateServiceUseCase(data)

    return res.status(service.status).json(service.json)
  },
}
