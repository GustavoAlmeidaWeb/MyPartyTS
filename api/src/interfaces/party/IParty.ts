import mongoose from 'mongoose'

export interface ICreateParty {
  title: string
  author: string
  description: string
  budget: number
  image: string
  services?: mongoose.Schema
}
