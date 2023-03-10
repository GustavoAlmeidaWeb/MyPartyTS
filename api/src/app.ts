import dotenv from 'dotenv'
import path from 'node:path'
import express, { Express } from 'express'
import cors from 'cors'
import router from '@routes/Router'
import { database } from '@db/conn'

// variables APP and ambient
const app = express() as Express
const ambient = 'development' as string // 'development' OR 'production'

// dotenv config
dotenv.config({ path: `${__dirname}/../.env.${ambient}` })

// middlewares: json config, form urlencoded, cors, static folder and routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: process.env.CORS }))
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(router)

// database connect and start API
database().then((): void => {
  app.listen(process.env.API_PORT, (): void => {
    console.log('Server ok!')
  })
})
