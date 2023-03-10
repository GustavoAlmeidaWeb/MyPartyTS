import { body } from 'express-validator'
import { ValidationChain } from 'express-validator/src/chain'

export const createAddressValidation = (): ValidationChain[] => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome do endereço é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O nome deve conter 3 caracteres.'),
    body('street')
      .notEmpty()
      .withMessage('O nome da rua é obrigatória.')
      .isLength({ min: 5 })
      .withMessage('O nome da rua deve conter 5 caracteres.'),
    body('number').notEmpty().withMessage('O número da casa é obrigatório.'),
    body('zipcode')
      .notEmpty()
      .withMessage('O CEP é obrigatório.')
      .isLength({ min: 8 })
      .withMessage('Por favor digite um CEP válido.'),
    body('neighborhood').notEmpty().withMessage('O bairro é obrigatório.'),
    body('city').notEmpty().withMessage('A cidade é obrigatória.'),
    body('province').notEmpty().withMessage('O estado é obrigatório.'),
    body('adjunt').notEmpty().withMessage('O complemento é obrigatório.'),
    body('map').notEmpty().withMessage('O mapa é obrigatório.'),
  ]
}
