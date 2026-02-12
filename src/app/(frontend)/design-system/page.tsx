import { notFound } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
import { Wordmark } from '@/components/brand/Wordmark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/Card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

/**
 * Design System Preview
 *
 * This page is intended for developers to preview and test UI components.
 * It is not meant to be used in production.
 */
export default function Page() {
  // Prevent access in production
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <div className="pt-8 pb-12 container">
      <h1 className="text-3xl font-bold mb-16">Design System</h1>

      {/* Brand */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Brand</h2>

        <div className="flex flex-wrap gap-4">
          <Logo className="text-foreground" />
          <Logo className="text-primary" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Wordmark className="text-foreground" />
          <Wordmark className="text-primary" />
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Typography</h2>

        <div className="prose">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>Paragraph</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12 flex flex-col gap-8">
        <h2 className="text-xl font-bold mb-4">Buttons</h2>

        {/* variants */}
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        {/* sizes */}
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>

        {/* disabled */}
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
          <Button variant="link" disabled>
            Disabled link
          </Button>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Cards</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            doc={{
              slug: 'card-1',
              title: 'Card 1',
              meta: { description: 'This is the first card.' },
            }}
            relationTo="posts"
          />
          <Card
            doc={{
              slug: 'card-2',
              title: 'Card 2',
              meta: { description: 'This is the second card.' },
            }}
            relationTo="posts"
          />
          <Card
            doc={{
              slug: 'card-3',
              title: 'Card 3',
              meta: { description: 'This is the third card.' },
            }}
            relationTo="posts"
          />
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Form Inputs</h2>

        {/* Checkbox */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <Checkbox id="terms" defaultChecked />
            <div className="grid gap-1">
              <Label htmlFor="terms">Accept terms and conditions</Label>
              <p className="text-sm text-muted-foreground">
                By clicking this checkbox, you agree to the terms.
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="grid gap-4 max-w-md mb-6">
          <Input type="text" placeholder="Text" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Number" />
          <Input type="date" />
          <Input type="text" placeholder="Disabled" disabled />
        </div>

        {/* Textarea */}
        <div className="max-w-md mb-6">
          <Textarea placeholder="Textarea" />
        </div>

        {/* Select */}
        <div className="max-w-xs">
          <Label>Select</Label>
          <Select>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  )
}
