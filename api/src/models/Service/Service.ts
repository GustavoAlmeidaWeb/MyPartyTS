import mongoose, { Schema, Types } from 'mongoose'
import { ICreateService } from '@interfaces/service/IService'

const serviceSchema: mongoose.Schema<ICreateService> = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    user_id: Types.ObjectId,
  },
  {
    timestamps: true,
  },
)

const ServiceModel = mongoose.model('Service', serviceSchema)

export { ServiceModel, serviceSchema }
