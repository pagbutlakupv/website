import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const APP_VERSION = process.env.npm_package_version || '1.0.0'
const HEALTH_CHECK_TIMEOUT_MS = 5000
const RESPONSE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
}

type CheckStatus = 'healthy' | 'unhealthy'
type HealthStatus = 'healthy' | 'degraded' | 'unhealthy'

type HealthResponse = {
  status: HealthStatus
  timestamp: string
  uptime: number
  version: string
  checks: {
    database: CheckStatus
    responseTime: number
  }
}

function createHealthResponse(): HealthResponse {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: APP_VERSION,
    checks: {
      database: 'unhealthy',
      responseTime: 0,
    },
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(message)), timeoutMs)
    }),
  ])
}

async function runDatabaseHealthCheck(): Promise<void> {
  const payload = await getPayload({ config })

  // A count query is enough to confirm the app can reach Postgres without
  // depending on an existing document or on collection read access.
  await withTimeout(
    payload.count({
      collection: 'users',
      overrideAccess: true,
    }),
    HEALTH_CHECK_TIMEOUT_MS,
    'Database health check timed out',
  )
}

async function buildHealthResponse(): Promise<{ body: HealthResponse; statusCode: number }> {
  const startedAt = Date.now()
  const health = createHealthResponse()

  try {
    await runDatabaseHealthCheck()
    health.checks.database = 'healthy'
  } catch (error) {
    health.status = 'unhealthy'
    console.error('Health check failed:', error)
  } finally {
    health.checks.responseTime = Date.now() - startedAt
  }

  const statusCode = health.status === 'healthy' ? 200 : 503

  return { body: health, statusCode }
}

export async function GET(): Promise<Response> {
  const { body, statusCode } = await buildHealthResponse()

  return Response.json(body, {
    headers: RESPONSE_HEADERS,
    status: statusCode,
  })
}

export async function HEAD(): Promise<Response> {
  const { statusCode } = await buildHealthResponse()

  return new Response(null, {
    headers: RESPONSE_HEADERS,
    status: statusCode,
  })
}
