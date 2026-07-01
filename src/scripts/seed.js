import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB, disconnectDB } from '../config/db.js'
import { User, getNextUserId } from '../models/User.js'

dotenv.config()

const SEED_USERS = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 555-0101',
    status: 'active',
    createdAt: new Date('2026-06-28T10:30:00.000Z'),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 555-0102',
    status: 'active',
    createdAt: new Date('2026-06-27T14:15:00.000Z'),
  },
  {
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 555-0103',
    status: 'inactive',
    createdAt: new Date('2026-06-26T09:00:00.000Z'),
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 555-0104',
    status: 'active',
    createdAt: new Date('2026-06-25T16:45:00.000Z'),
  },
  {
    name: 'Chris Wilson',
    email: 'chris.w@example.com',
    phone: '+1 555-0105',
    status: 'inactive',
    createdAt: new Date('2026-06-24T11:20:00.000Z'),
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 555-0106',
    status: 'active',
    createdAt: new Date('2026-06-23T08:50:00.000Z'),
  },
]

async function seed() {
  await connectDB()

  const existing = await User.countDocuments()
  if (existing > 0) {
    console.log(`Database already has ${existing} user(s). Skipping seed.`)
    await disconnectDB()
    return
  }

  for (const userData of SEED_USERS) {
    const id = await getNextUserId()
    await User.create({ id, ...userData })
  }

  console.log(`Seeded ${SEED_USERS.length} users successfully.`)
  await disconnectDB()
}

seed().catch(async (err) => {
  console.error('Seed failed:', err.message)
  await disconnectDB()
  process.exit(1)
})
