import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username', { length: 256 }),
  password: text('password', { length: 256 }),
  email: text('email', { length: 256 }),
  role: text('role', { length: 256 })
})

export type User = typeof users.$inferSelect
