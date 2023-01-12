import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<string> => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractErrors = []

  errors.array().map(err => extractErrors.push(err.msg))

  return res.status(422).json({
    errors: extractErrors,
  })
}
