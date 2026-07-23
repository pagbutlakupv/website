'use client'

import React, { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { SiFacebook, SiX } from '@icons-pack/react-simple-icons'

import { Button } from '@/components/ui/button'

type Props = {
  title: string
  url: string
}

type ShareLink = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

export const SocialMediaShare = ({ title, url }: Props) => {
  const [copied, setCopied] = useState(false)

  const encodedTitle = encodeURIComponent(title)
  const encodedURL = encodeURIComponent(url)

  const shareLinks: ShareLink[] = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: SiFacebook,
      label: 'Share on Facebook',
    },
    {
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`,
      icon: SiX,
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
