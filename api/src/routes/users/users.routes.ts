import { Router } from 'express'
import { userController } from '@controllers/users/UsersController'
import {
  updateUpdateValidation,
  userCreateValidation,
  userLoginValidation,
} from '@middlewares/userValidation'
import { validate } from '@middlewares/handleValidation'
import { authGuard } from '@middlewares/authGuard'
import { imageUpload } from '@middlewares/imageUploads'

const userRoutes: Router = Router()

userRoutes.put(
  '/update',
  authGuard,
  imageUpload.single('image'),
  updateUpdateValidation(),
  validate,
  userController.update,
)
userRoutes.post(
  '/register',
  userCreateValidation(),
  validate,
  userController.register,
)
userRoutes.post('/login', userLoginValidation(), validate, userController.login)
userRoutes.delete('/delete', authGuard, userController.delete)
userRoutes.get('/all', authGuard, userController.findAll)
userRoutes.get('/', authGuard, userController.find)

export default userRoutes
