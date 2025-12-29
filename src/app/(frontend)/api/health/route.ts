import { getPayload } from 'payload'
import config from '@payload-config'

// Declare process for TypeScript in Next.js API routes
declare const process: {
  uptime(): number
  env: {
    npm_package_version?: string
    [key: string]: string | undefined
  }
}

/**
 * Health check endpoint
 * Returns the status of the application and its dependencies
 * Useful for monitoring and load balancer health checks
 */
export async function GET(): Promise<Response> {
  const startTime = Date.now()
  const health: {
    status: 'healthy' | 'degraded' | 'unhealthy'
    timestamp: string
    uptime: number
    version: string
    checks: {
      database: 'healthy' | 'unhealthy'
      responseTime: number
    }
  } = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: 'unhealthy',
      responseTime: 0,
    },
  }

  try {
    // Check database connection
    const payload = await getPayload({ config })
    
    // Simple database query to verify connection
    await payload.db.connect()
    
    // Try a simple query
    await payload.find({
        collection: 'users',
        limit: 1,
        depth: 0,
      })

    health.checks.database = 'healthy'
  } catch (error) {
    health.status = 'degraded'
    health.checks.database = 'unhealthy'
    console.error('Health check failed:', error)
  }

  const responseTime = Date.now() - startTime
  health.checks.responseTime = responseTime

  // If database is unhealthy, mark overall status as degraded
  if (health.checks.database === 'unhealthy') {
    health.status = 'degraded'
  }

  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503

  return Response.json(health, { status: statusCode })
}