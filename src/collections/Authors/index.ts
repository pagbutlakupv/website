import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Authors: CollectionConfig<'authors'> = {
  slug: 'authors',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'slug', 'updatedAt'],
  },

  access: {
    read: () => true,
  },

  defaultPopulate: {
    name: true,
    slug: true,
    role: true,
    bio: true,
    avatar: true,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'website',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'x',
          label: 'X (Twitter)',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
}
