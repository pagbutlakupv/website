'use client'

import { FC, useEffect, useState } from 'react'
import { Check, Copy, Facebook } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
  title: string
  url: string
}

type ShareLink = {
  href: string
  icon: FC<{ className?: string }>
  label: string
}

const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.26l-4.9-7.42L5.55 22H2.44l7.24-8.28L1.92 2h6.42l4.43 6.73L18.9 2Zm-1.1 18h1.73L7.4 3.9H5.54L17.8 20Z" />
  </svg>
)

export const SocialMediaShare: FC<Props> = ({ title, url }) => {
  const [copied, setCopied] = useState(false)

  const encodedTitle = encodeURIComponent(title)
  const encodedURL = encodeURIComponent(url)

  const shareLinks: ShareLink[] = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: Facebook,
      label: 'Share on Facebook',
    },
    {
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`,
      icon: XIcon,
      label: 'Share on X',
    },
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => window.clearTimeout(timeout)
  }, [copied])

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        aria-label={copied ? 'Link copied' : 'Copy link'}
        onClick={handleCopy}
        size="icon"
        title={copied ? 'Link copied' : 'Copy link'}
        type="button"
        variant="outline"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">{copied ? 'Link copied' : 'Copy link'}</span>
      </Button>


      {shareLinks.map((link) => {
        const Icon = link.icon

        return (
          <Button asChild key={link.label} size="icon" variant="outline">
            <a
              aria-label={link.label}
              href={link.href}
              rel="noreferrer"
              target="_blank"
              title={link.label}
            >
              <Icon className="h-4 w-4" />
              <span className="sr-only">{link.label}</span>
            </a>
          </Button>
        )
      })}


    </div>
  )
}
