export function notFoundHandler(_req, res) {
  res.status(404).json({ error: 'Route not found' })
}

export function errorHandler(err, _req, res, _next) {
  console.error(err)

  if (err.message?.includes('CORS blocked')) {
    return res.status(403).json({ error: err.message })
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field'
    return res.status(409).json({ error: `A user with this ${field} already exists` })
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
    return res.status(400).json({ error: message })
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
}
