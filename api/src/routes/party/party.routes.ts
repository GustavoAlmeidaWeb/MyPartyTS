import { Router } from 'express'
import { validate } from '@middlewares/handleValidation'
import { imageUpload } from '@middlewares/imageUploads'
import { partyController } from '@controllers/party/PartyController'
import {
  createPartyValidation,
  updatePartyValidation,
} from '@middlewares/partyValidation'

const partyRoutes = Router() as Router

partyRoutes.post(
  '/create',
  imageUpload.single('image'),
  createPartyValidation(),
  validate,
  partyController.create,
)
partyRoutes.put(
  '/:id',
  imageUpload.single('image'),
  updatePartyValidation(),
  validate,
  partyController.update,
)
partyRoutes.delete('/:id', partyController.delete)
partyRoutes.get('/:id', partyController.find)
partyRoutes.get('/', partyController.findAll)

export default partyRoutes
