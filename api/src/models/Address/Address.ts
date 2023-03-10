import mongoose, { Schema, Types } from 'mongoose'
import { IAddress } from '@interfaces/address/IAddress'

const addressSchema: mongoose.Schema<IAddress> = new Schema(
  {
    name: String,
    zipcode: String,
    street: String,
    neighborhood: String,
    number: String,
    city: String,
    province: String,
    adjunt: String,
    map: String,
    user_id: Types.ObjectId,
  },
  {
    timestamps: true,
  },
)

const AddressModel = mongoose.model('Address', addressSchema)

export { AddressModel, addressSchema }
