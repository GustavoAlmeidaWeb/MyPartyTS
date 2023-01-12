import mongoose from 'mongoose'

export const database = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conectou ao Mongo.')
  } catch (error) {
    console.log(`Erro conexão db: ${error}`)
  }
}
