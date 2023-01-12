import mongoose, { Schema } from 'mongoose'
import { ICreateService } from '@interfaces/service/IService'

const serviceSchema: mongoose.Schema<ICreateService> = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
  },
  {
    timestamps: true,
  },
)

const ServiceModel = mongoose.model('Service', serviceSchema)

export { ServiceModel, serviceSchema }
