'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

type Props = {
  title: string
  url: string
}

export const SocialMediaShare: React.FC<Props> = ({ title, url }) => {
  const [copied, setCopied] = React.useState(false)

  const encodedTitle = encodeURIComponent(title)
  const encodedURL = encodeURIComponent(url)

  const shareLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      label: 'Facebook',
    },
    {
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`,
      label: 'X',
    },
    {
        href: 'https://www.instagram.com/',
        label: `Instagram`
    }
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }

  React.useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => window.clearTimeout(timeout)
  }, [copied])

  return (
    <section className="mx-auto mt-10 max-w-[48rem] border-t border-border pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-medium ">Share this article</p>
          <p className="text-sm text-muted-foreground">Send it to pagbutlak viewers</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {shareLinks.map((link) => (
            <Button asChild key={link.label} size="sm" variant="outline">
              <a href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            </Button>
          ))}

          <Button onClick={handleCopy} size="sm" type="button" variant="secondary">
            {copied ? 'Copied' : 'Copy link'}
          </Button>
        </div>
      </div>
    </section>
  )
}
