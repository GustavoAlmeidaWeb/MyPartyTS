import { Router } from 'express'
import { validate } from '@middlewares/handleValidation'
import { authGuard } from '@middlewares/authGuard'
import { imageUpload } from '@middlewares/imageUploads'
import { serviceCreateValidation } from '@middlewares/serviceValidation'
import { serviceController } from '@controllers/service/ServiceController'

const serviceRoutes: Router = Router()

serviceRoutes.post(
  '/create',
  authGuard,
  imageUpload.single('image'),
  serviceCreateValidation(),
  validate,
  serviceController.create,
)
serviceRoutes.delete('/:id', authGuard, serviceController.delete)
serviceRoutes.get('/:id', authGuard, serviceController.get)

export default serviceRoutes
