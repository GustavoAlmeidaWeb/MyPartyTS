import { Request, Response } from 'express'
import { IAddress, IDeleteAddress } from '@interfaces/address/IAddress'
import { createAddressUseCase } from './CreateAddressUseCase'
import { findAddressUseCase } from './FindAddressUseCase'
import { findAllAddressesUseCase } from './FindAllAddressesUseCase'
import { deleteAddressUseCase } from './DeleteAddressUseCase'

export const addressController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const addressData = {
      name: req.body.name,
      zipcode: req.body.zipcode,
      street: req.body.street,
      number: req.body.number,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      province: req.body.province,
      adjunt: req.body.adjunt,
      map: req.body.map,
      user_id: req.user._id,
    } as IAddress

    const address = await createAddressUseCase(addressData)

    return res.status(address.status).json(address.json)
  },

  find: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const address = await findAddressUseCase(id)

    return res.status(address.status).json(address.json)
  },

  findAll: async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.user

    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1

    const limit =
      req.query.limit && Number(req.query.limit) ? Number(req.query.limit) : 10

    const take = limit
    const skip = (Number(page) - 1) * take

    const addresses = await findAllAddressesUseCase({
      page,
      skip,
      take,
      user_id: _id,
    })

    return res.status(200).json(addresses)
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const data = {
      id: req.params.id,
      user_id: req.user._id,
    } as IDeleteAddress

    const result = await deleteAddressUseCase(data)

    return res.status(result.status).json(result.json)
  },
}
