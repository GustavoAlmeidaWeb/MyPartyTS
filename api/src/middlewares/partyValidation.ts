import { body, check } from 'express-validator'
import { ValidationChain } from 'express-validator/src/chain'

export const createPartyValidation = (): ValidationChain[] => {
  return [
    body('title')
      .notEmpty()
      .withMessage('O nome da festa é obrigatório.')
      .isLength({ min: 5 })
      .withMessage('O nome deve conter 5 caracteres.'),
    body('author')
      .notEmpty()
      .withMessage('O nome do organizador da festa é obrigatório.')
      .isLength({ min: 5 })
      .withMessage('O nome do organizador deve conter 5 caracteres.'),
    body('description')
      .notEmpty()
      .withMessage('A descrição da festa é obrigatória.')
      .isLength({ min: 5 })
      .withMessage('A descrição deve conter 5 caracteres.'),
    body('budget')
      .notEmpty()
      .withMessage('A orçamento da festa é obrigatória.')
      .isNumeric()
      .withMessage('Por favor digite um valor válido.'),
    body('services')
      .notEmpty()
      .withMessage('Por favor adicione serviços a sua festa.'),
    check('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('A imagem da festa é obrigatório.')
      }
      return true
    }),
  ]
}

export const updatePartyValidation = (): ValidationChain[] => {
  return [
    body('title')
      .notEmpty()
      .withMessage('O nome da festa é obrigatório.')
      .isLength({ min: 5 })
      .withMessage('O nome deve conter 5 caracteres.'),
    body('author')
      .notEmpty()
      .withMessage('O nome do organizador da festa é obrigatório.')
      .isLength({ min: 5 })
      .withMessage('O nome do organizador deve conter 5 caracteres.'),
    body('description')
      .notEmpty()
      .withMessage('A descrição da festa é obrigatória.')
      .isLength({ min: 5 })
      .withMessage('A descrição deve conter 5 caracteres.'),
    body('budget')
      .notEmpty()
      .withMessage('A orçamento da festa é obrigatória.')
      .isNumeric()
      .withMessage('Por favor digite um valor válido.'),
    body('services')
      .notEmpty()
      .withMessage('Por favor adicione serviços a sua festa.'),
  ]
}
