import mongoose, { Schema } from 'mongoose'
import { ICreateUser } from '@interfaces/users/IUsers'

const userSchema: mongoose.Schema<ICreateUser> = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    image: String,
  },
  {
    timestamps: true,
  },
)

const UserModel = mongoose.model('User', userSchema)

export { UserModel, userSchema }
