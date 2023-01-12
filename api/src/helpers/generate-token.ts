import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

// Token Generator
export const generateToken = (id: Types.ObjectId): string => {
  // JWT Token
  const token = process.env.JWT_TOKEN

  return jwt.sign({ id }, token)
}
