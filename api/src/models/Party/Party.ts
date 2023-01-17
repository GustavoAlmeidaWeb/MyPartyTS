import mongoose, { Schema, Types } from 'mongoose'
import { serviceSchema } from '@models/Service/Service'
import { ICreateParty } from '@interfaces/party/IParty'

const partySchema: mongoose.Schema<ICreateParty> = new Schema(
  {
    title: String,
    author: String,
    description: String,
    budget: Number,
    image: String,
    user_id: Types.ObjectId,
    services: [serviceSchema],
  },
  {
    timestamps: true,
  },
)

const PartyModel = mongoose.model('Party', partySchema)

export { PartyModel, partySchema }
