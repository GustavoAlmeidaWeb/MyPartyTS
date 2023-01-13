import { Router } from 'express'
import { validate } from '@middlewares/handleValidation'
import { authGuard } from '@middlewares/authGuard'
import { imageUpload } from '@middlewares/imageUploads'
import {
  serviceCreateValidation,
  serviceUpdateValidation,
} from '@middlewares/serviceValidation'
import { serviceController } from '@controllers/service/ServiceController'

const serviceRoutes: Router = Router()

serviceRoutes.use(authGuard)

serviceRoutes.post(
  '/create',
  imageUpload.single('image'),
  serviceCreateValidation(),
  validate,
  serviceController.create,
)
serviceRoutes.put(
  '/:id',
  imageUpload.single('image'),
  serviceUpdateValidation(),
  validate,
  serviceController.update,
)
serviceRoutes.delete('/:id', serviceController.delete)
serviceRoutes.get('/:id', serviceController.get)
serviceRoutes.get('/', serviceController.getAll)

export default serviceRoutes
