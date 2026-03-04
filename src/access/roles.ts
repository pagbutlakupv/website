export const userRoles = ['journalist', 'editor', 'admin'] as const

export type UserRole = (typeof userRoles)[number]
type RoleBearingUser = {
  role?: string | null
}
type RoleCheckArgs = {
  req: {
    user?: RoleBearingUser | null
  }
}

const isUserRole = (value: string): value is UserRole => value in rolePriority

const rolePriority: Record<UserRole, number> = {
  journalist: 1,
  editor: 2,
  admin: 3,
}

export const getUserRole = (user?: RoleBearingUser | null): UserRole => {
  if (typeof user?.role === 'string' && isUserRole(user.role)) {
    return user.role
  }

  // Older sessions will not have the role saved into their JWT yet.
  return 'admin'
}

export const hasMinRoleLevel = (
  user: RoleBearingUser | null | undefined,
  minimumRole: UserRole,
): boolean => {
  return rolePriority[getUserRole(user)] >= rolePriority[minimumRole]
}

export const hasMinRole = (minimumRole: UserRole) => {
  return ({ req: { user } }: RoleCheckArgs): boolean => hasMinRoleLevel(user, minimumRole)
}
