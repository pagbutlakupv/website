import type { CollectionBeforeChangeHook } from 'payload'

import { getUserRole } from '../../../access/roles'

type PostAuthor = number | { id: number }

const hasAuthor = (
  authors: PostAuthor[] | undefined | null,
  userID: number,
): boolean => {
  if (!authors || authors.length === 0) {
    return false
  }

  return authors.some((author) => {
    if (!author) {
      return false
    }

    if (typeof author === 'number') {
      return author === userID
    }

    return author.id === userID
  })
}

export const enforceEditorialWorkflow: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const user = req.user

  if (!user) {
    return data
  }

  const role = getUserRole(user)
  const nextData = {
    ...data,
  } as typeof data & {
    _status?: 'draft' | 'published' | null
    authors?: PostAuthor[]
    workflowStage?: string | null
  }
  const currentStatus = (originalDoc?._status as 'draft' | 'published' | null | undefined) ?? 'draft'
  const requestedStatus = req.data?._status as 'draft' | 'published' | null | undefined
  const nextStatus =
    requestedStatus ??
    nextData._status ??
    currentStatus

  if (
    operation === 'create' &&
    (!Array.isArray(nextData.authors) || nextData.authors.length === 0)
  ) {
    nextData.authors = [user.id]
  }

  if (role === 'journalist') {
    if (operation === 'update' && originalDoc && !hasAuthor(originalDoc.authors, user.id)) {
      throw new Error('Journalists can only edit stories that list them as an author.')
    }

    if (
      Array.isArray(nextData.authors) &&
      nextData.authors.length > 0 &&
      !hasAuthor(nextData.authors, user.id)
    ) {
      throw new Error('Journalists must keep themselves attached to the story byline.')
    }

    if (currentStatus !== 'published' && nextStatus === 'published') {
      throw new Error('An editor or admin must publish this story after review.')
    }
  }

  if (nextStatus === 'published') {
    nextData.workflowStage = 'published'
  } else if (!nextData.workflowStage && operation === 'create') {
    nextData.workflowStage = 'drafting'
  }

  return nextData
}
