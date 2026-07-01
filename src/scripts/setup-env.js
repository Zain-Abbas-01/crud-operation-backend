import { writeFileSync, existsSync } from 'fs'

const uri = process.argv[2]

if (!uri || !uri.startsWith('mongodb')) {
  console.error('\nUsage: npm run setup:env -- "mongodb+srv://user:pass@cluster.mongodb.net/crud-users"\n')
  process.exit(1)
}

const envContent = `# MongoDB Atlas
MONGODB_URI=${uri}

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Local dev server port
PORT=5000

NODE_ENV=development
`

if (existsSync('.env')) {
  console.log('Updated existing .env file')
} else {
  console.log('Created .env file')
}

writeFileSync('.env', envContent, 'utf8')
console.log('MongoDB Atlas URI saved. Run: npm run test:db')
