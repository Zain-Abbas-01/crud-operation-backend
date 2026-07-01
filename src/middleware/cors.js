import cors from 'cors'

function getAllowedOrigins() {
  const raw = process.env.FRONTEND_URL || 'http://localhost:5173'
  return raw.split(',').map((origin) => origin.trim()).filter(Boolean)
}

export const corsMiddleware = cors({
  origin(origin, callback) {
    const allowed = getAllowedOrigins()

    if (!origin || allowed.includes(origin) || allowed.includes('*')) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
