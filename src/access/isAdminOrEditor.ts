import type { Access } from 'payload'

export const isAdminOrEditor: Access = ({ req }) => {
  if (!req.user) return false
  return req.user.role === 'admin' || req.user.role === 'editor' || req.user.role === 'cowork'
}
