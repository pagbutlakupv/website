import canUseDOM from './canUseDOM'

const isValidAbsoluteURL = (value?: string | null): value is string => {
  if (!value) {
    return false
  }

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export const getServerSideURL = () => {
  if (isValidAbsoluteURL(process.env.NEXT_PUBLIC_SERVER_URL)) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }

  const vercelURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null

  if (isValidAbsoluteURL(vercelURL)) {
    return vercelURL
  }

  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  const vercelURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null

  if (isValidAbsoluteURL(vercelURL)) {
    return vercelURL
  }

  return isValidAbsoluteURL(process.env.NEXT_PUBLIC_SERVER_URL)
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : 'http://localhost:3000'
}
