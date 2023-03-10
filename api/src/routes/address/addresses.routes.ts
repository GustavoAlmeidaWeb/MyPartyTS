import { Router } from 'express'
import { addressController } from '@controllers/address/AddressController'
import { createAddressValidation } from '@middlewares/addressValidation'
import { validate } from '@middlewares/handleValidation'

const addressRoutes = Router() as Router

addressRoutes.post(
  '/create',
  createAddressValidation(),
  validate,
  addressController.create,
)
addressRoutes.delete('/:id', addressController.delete)
addressRoutes.get('/:id', addressController.find)
addressRoutes.get('/', addressController.findAll)

export default addressRoutes
