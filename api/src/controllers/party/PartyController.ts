import {
  ICreateParty,
  IDeleteParty,
  IUpdateParty,
} from '@interfaces/party/IParty'
import { Request, Response } from 'express'
import { createPartyUseCase } from './CreatePartyUseCase'
import { deletePartyUseCase } from './DeletePartyUseCase'
import { findAllPartiesUseCase } from './FindAllPartiesUseCase'
import { findPartyUseCase } from './FindPartyUseCase'
import { updatePartyUseCase } from './UpdatePartyUseCase'

export const partyController = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const data = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      budget: req.body.budget,
      services: req.body.services,
      user_id: req.user._id,
    } as ICreateParty

    if (req.file) {
      data.image = req.file.filename
    }

    const party = await createPartyUseCase(data)

    return res.status(party.status).json(party.json)
  },

  find: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const party = await findPartyUseCase(id)

    return res.status(party.status).json(party.json)
  },

  findAll: async (req: Request, res: Response): Promise<Response> => {
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1

    const limit =
      req.query.limit && Number(req.query.limit) ? Number(req.query.limit) : 10

    const take = limit
    const skip = (Number(page) - 1) * take

    const parties = await findAllPartiesUseCase({ page, skip, take })

    return res.status(200).json(parties)
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const data = {
      id: req.params.id,
      user_id: req.user._id,
    } as IDeleteParty

    const result = await deletePartyUseCase(data)

    return res.status(result.status).json(result.json)
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    const data = {
      id: req.params.id,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      budget: req.body.budget,
      services: req.body.services,
      user_id: req.user._id,
    } as IUpdateParty

    if (req.file) {
      data.image = req.file.filename
    }

    const party = await updatePartyUseCase(data)

    return res.status(party.status).json(party.json)
  },
}
