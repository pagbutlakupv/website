import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { hasMinRole, hasMinRoleLevel, userRoles } from '../../access/roles'

const canCreateUser: NonNullable<CollectionConfig['access']>['create'] = async ({ req }) => {
  if (hasMinRoleLevel(req.user, 'admin')) {
    return true
  }

  const { totalDocs } = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
  })

  return totalDocs === 0
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: hasMinRole('admin'),
    create: canCreateUser,
    delete: hasMinRole('admin'),
    read: authenticated,
    update: hasMinRole('admin'),
  },
  admin: {
    defaultColumns: ['name', 'role', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') {
          return data
        }

        const { totalDocs } = await req.payload.count({
          collection: 'users',
          overrideAccess: true,
        })

        if (totalDocs === 0) {
          return {
            ...data,
            role: 'admin',
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'journalist',
      options: userRoles.map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })),
      required: true,
      saveToJWT: true,
      access: {
        create: hasMinRole('admin'),
        update: hasMinRole('admin'),
      },
      admin: {
        description:
          'Journalists can draft stories, editors can prepare and publish, and admins manage the newsroom.',
      },
    },
  ],
  timestamps: true,
}
