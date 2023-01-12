import mongoose, { Schema } from 'mongoose'
import { serviceSchema } from '@models/Service/Service'
import { ICreateParty } from '@interfaces/party/IParty'

const partySchema: mongoose.Schema<ICreateParty> = new Schema(
  {
    title: String,
    author: String,
    description: String,
    budget: Number,
    image: String,
    services: [serviceSchema],
  },
  {
    timestamps: true,
  },
)

const PartyModel = mongoose.model('Party', partySchema)

export { PartyModel, partySchema }
