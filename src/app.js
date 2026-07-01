import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { corsMiddleware } from './middleware/cors.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import routes from './routes/index.js'

dotenv.config()

const app = express()

app.use(corsMiddleware)
app.use(express.json({ limit: '1mb' }))

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    next(err)
  }
})

app.use('/api', routes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
