import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone is required'),
  status: z.enum(['active', 'inactive']).optional().default('active'),
})

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone is required'),
  status: z.enum(['active', 'inactive']),
})

export const bulkDeleteSchema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1, 'At least one id is required'),
})

export const bulkStatusSchema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1, 'At least one id is required'),
  status: z.enum(['active', 'inactive']),
})

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(', ')
      return res.status(400).json({ error: message })
    }

    req.body = result.data
    next()
  }
}

export function parseIdParam(req, res, next) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid user id' })
  }

  req.params.id = id
  next()
}
