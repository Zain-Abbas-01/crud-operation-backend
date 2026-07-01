import { User, getNextUserId } from '../models/User.js'

export async function getUsers(_req, res, next) {
  try {
    const users = await User.find().sort({ id: -1 }).lean()
    const formatted = users.map((user) => ({
      ...user,
      createdAt: user.createdAt?.toISOString(),
    }))
    res.json(formatted)
  } catch (err) {
    next(err)
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findOne({ id: req.params.id }).lean()

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      ...user,
      createdAt: user.createdAt?.toISOString(),
    })
  } catch (err) {
    next(err)
  }
}

export async function createUser(req, res, next) {
  try {
    const id = await getNextUserId()
    const user = await User.create({ id, ...req.body })
    res.status(201).json(user.toJSON())
  } catch (err) {
    next(err)
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true },
    )

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user.toJSON())
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function bulkDeleteUsers(req, res, next) {
  try {
    const { ids } = req.body
    await User.deleteMany({ id: { $in: ids } })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function bulkUpdateStatus(req, res, next) {
  try {
    const { ids, status } = req.body
    await User.updateMany({ id: { $in: ids } }, { status })
    const users = await User.find().sort({ id: -1 }).lean()
    const formatted = users.map((user) => ({
      ...user,
      createdAt: user.createdAt?.toISOString(),
    }))
    res.json(formatted)
  } catch (err) {
    next(err)
  }
}

export async function healthCheck(_req, res) {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
}
