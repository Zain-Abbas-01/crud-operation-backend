import { Router } from 'express'
import {
  bulkDeleteUsers,
  bulkUpdateStatus,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  healthCheck,
  updateUser,
} from '../controllers/userController.js'
import {
  bulkDeleteSchema,
  bulkStatusSchema,
  createUserSchema,
  parseIdParam,
  updateUserSchema,
  validateBody,
} from '../middleware/validate.js'

const router = Router()

router.get('/health', healthCheck)

router.get('/users', getUsers)
router.post('/users', validateBody(createUserSchema), createUser)
router.post('/users/bulk-delete', validateBody(bulkDeleteSchema), bulkDeleteUsers)
router.patch('/users/bulk-status', validateBody(bulkStatusSchema), bulkUpdateStatus)
router.get('/users/:id', parseIdParam, getUser)
router.put('/users/:id', parseIdParam, validateBody(updateUserSchema), updateUser)
router.delete('/users/:id', parseIdParam, deleteUser)

export default router
