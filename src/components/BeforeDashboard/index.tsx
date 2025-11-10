import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const isDev = process.env.NODE_ENV === 'development'

const BeforeDashboard: React.FC = () => {
  if (!isDev) return <div className={baseClass}></div>

  return (
    <div className={baseClass}>
      <Banner>
        {'You are currently in development mode.'}
        <br />
        {'You can '}
        <SeedButton />
        {' to jump-start the site. Warning: this will delete all data.'}
      </Banner>
    </div>
  )
}

export default BeforeDashboard
