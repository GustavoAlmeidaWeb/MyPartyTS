import express, { Express } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import router from '@routes/Router'
import { database } from '@db/conn'

dotenv.config()
const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: process.env.CORS }))
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(router)

database().then((): void => {
  app.listen(process.env.API_PORT, (): void => {
    console.log('Server ok!')
  })
})
