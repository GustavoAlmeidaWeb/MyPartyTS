import { body } from 'express-validator'
import { ValidationChain } from 'express-validator/src/chain'

export const userCreateValidation = (): ValidationChain[] => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O Nome é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter 3 caracteres.'),
    body('email')
      .notEmpty()
      .withMessage('O e-mail é obrigatório.')
      .isEmail()
      .withMessage('Por favor digite um e-mail válido.'),
    body('phone')
      .notEmpty()
      .withMessage('O telefone é obrigatório.')
      .isLength({ min: 10 })
      .withMessage('Por favor digite um telefone válido.'),
    body('password')
      .notEmpty()
      .withMessage('O senha é obrigatória.')
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter no mínimo 5 caracteres.'),
    body('confirmpassword')
      .notEmpty()
      .withMessage('A confirmação da senha é obrigatoria.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('As senhas não são iguais.')
        }
        return true
      }),
  ]
}

export const userLoginValidation = (): ValidationChain[] => {
  return [
    body('email')
      .notEmpty()
      .withMessage('O e-mail é obrigatório')
      .isEmail()
      .withMessage('Por favor digite um e-mail válido.'),
    body('password')
      .notEmpty()
      .withMessage('A senha é obrigatória')
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter 5 caracteres.'),
  ]
}

export const updateUpdateValidation = (): ValidationChain[] => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome é obrigatório')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter no mínimo 3 caracteres.'),
    body('phone')
      .notEmpty()
      .withMessage('O telefone é obrigatório.')
      .isLength({ min: 10 })
      .withMessage('Por favor digite um telefone válido.'),
    body('currentpassword')
      .optional()
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter 5 caracteres.')
      .custom((value, { req }) => {
        if (value === req.body.newpassword) {
          throw new Error('Por favor, crie uma nova senha diferente da atual.')
        }
        if (!req.body.newpassword || !req.body.confirmnewpassword) {
          throw new Error('A nova senha e a confirmação são obrigatórias.')
        }
        if (req.body.newpassword !== req.body.confirmnewpassword) {
          throw new Error('A nova senha e a confirmação são diferentes.')
        }
        if (
          req.body.newpassword.length < 5 ||
          req.body.confirmnewpassword.length < 5
        ) {
          throw new Error(
            'A nova senha e a confirmação precisam ter no mínimo 5 caracteres.',
          )
        }
        return true
      }),
  ]
}
