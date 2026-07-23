import { createLocalReq, getPayload } from 'payload'
import { seed } from './index.js'
import dotenv from 'dotenv'
import readline from 'node:readline'

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('close', () => process.exit(0))

function confirm(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')
    })
  })
}

async function main() {
  console.log('\nThis will clear ALL existing data and seed the database with demo content.\n')

  const shouldProceed = await confirm('Do you want to continue? (y/N) ')

  if (!shouldProceed) {
    console.log('Seed aborted.')
    process.exit(0)
  }

  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  try {
    const req = await createLocalReq({}, payload)
    await seed({ payload, req, sequentialDelete: true })
    console.log('\nDatabase seeded successfully!')
  } catch (error) {
    console.error('\nError seeding database:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()
