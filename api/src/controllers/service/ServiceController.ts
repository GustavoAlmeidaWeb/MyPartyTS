import { ICreateService } from '@interfaces/service/IService'
import { Request, Response } from 'express'
import { createServiceUseCase } from './CreateServiceUseCase'
import { deleteServiceUseCase } from './DeleteServiceUseCase'
import { getServiceUseCase } from './GetServiceUseCase'

export const serviceController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const data = <ICreateService>{
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
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

  delete: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const remove = await deleteServiceUseCase(id)

    return res.status(remove.status).json(remove.json)
  },
}
