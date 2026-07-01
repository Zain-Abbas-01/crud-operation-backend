import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB, disconnectDB } from '../config/db.js'

dotenv.config()

async function testConnection() {
  const uri = process.env.MONGODB_URI

  if (!uri || uri.includes('username:password')) {
    console.error('\nMongoDB Atlas is not configured yet.')
    console.error('1. Open crud-operation-backend/.env')
    console.error('2. Replace MONGODB_URI with your Atlas connection string')
    console.error('   Or run: npm run setup:env -- "your-connection-string"\n')
    process.exit(1)
  }

  try {
    console.log('Connecting to MongoDB Atlas...')
    await connectDB()
    console.log('Connected successfully!')
    console.log(`Database: ${mongoose.connection.name}`)
    console.log(`Host: ${mongoose.connection.host}`)
    await disconnectDB()
    console.log('Connection test passed.\n')
  } catch (err) {
    console.error('\nConnection failed:', err.message)
    console.error('\nCommon fixes:')
    console.error('- Check username and password in MONGODB_URI')
    console.error('- URL-encode special characters in your password (@ → %40, # → %23)')
    console.error('- In Atlas: Network Access → allow your IP (or 0.0.0.0/0 for dev)')
    console.error('- In Atlas: Database Access → user has read/write on the database\n')
    process.exit(1)
  }
}

testConnection()
