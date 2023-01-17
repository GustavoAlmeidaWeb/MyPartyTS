import { Router } from 'express'
import { validate } from '@middlewares/handleValidation'
import { authGuard } from '@middlewares/authGuard'
import { imageUpload } from '@middlewares/imageUploads'
import { partyController } from '@controllers/party/PartyController'
import { createPartyValidation } from '@middlewares/partyValidation'

const partyRoutes = Router() as Router

partyRoutes.use(authGuard)

partyRoutes.post(
  '/create',
  imageUpload.single('image'),
  createPartyValidation(),
  validate,
  partyController.create,
)
partyRoutes.delete('/:id', partyController.delete)
partyRoutes.put('/:id', partyController.update)
partyRoutes.get('/:id', partyController.find)
partyRoutes.get('/', partyController.findAll)

export default partyRoutes
