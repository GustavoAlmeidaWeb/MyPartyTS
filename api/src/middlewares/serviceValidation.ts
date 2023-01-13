import { body, check } from 'express-validator'
import { ValidationChain } from 'express-validator/src/chain'

export const serviceCreateValidation = (): ValidationChain[] => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome do serviço é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter no mínimo 3 caracteres.'),
    body('description')
      .notEmpty()
      .withMessage('A descrição do serviço é obrigatória.')
      .isLength({ min: 10 })
      .withMessage(
        'A descrição do serviço precisa ter no mínimo 10 caracteres.',
      ),
    body('price')
      .notEmpty()
      .withMessage('O preço do serviço é obrigatório.')
      .isNumeric()
      .withMessage('O preço do serviço deve ser números.'),
  ]
}

export const serviceUpdateValidation = (): ValidationChain[] => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome do serviço é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter no mínimo 3 caracteres.'),
    body('description')
      .notEmpty()
      .withMessage('A descrição do serviço é obrigatória.')
      .isLength({ min: 10 })
      .withMessage(
        'A descrição do serviço precisa ter no mínimo 10 caracteres.',
      ),
    body('price')
      .notEmpty()
      .withMessage('O preço do serviço é obrigatório.')
      .isNumeric()
      .withMessage('O preço do serviço deve ser números.'),
    check('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('A imagem é um campo obrigatório.')
      }
      return true
    }),
  ]
}
