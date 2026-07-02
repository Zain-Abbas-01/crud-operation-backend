import cors from 'cors'

function getAllowedOrigins() {
  const raw = process.env.FRONTEND_URL || 'http://localhost:5173'
  return raw.split(',').map((origin) => origin.trim()).filter(Boolean)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function originMatchesPattern(origin, pattern) {
  if (!pattern.includes('*')) {
    return origin === pattern
  }

  const regex = new RegExp(
    `^${pattern.split('*').map(escapeRegExp).join('.*')}$`,
  )
  return regex.test(origin)
}

function isOriginAllowed(origin, allowed) {
  if (!origin) {
    return true
  }

  if (allowed.includes('*')) {
    return true
  }

  return allowed.some((pattern) => originMatchesPattern(origin, pattern))
}

export const corsMiddleware = cors({
  origin(origin, callback) {
    const allowed = getAllowedOrigins()

    if (isOriginAllowed(origin, allowed)) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
