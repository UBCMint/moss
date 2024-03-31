import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { headsets } from './headsets'

export const recordings = sqliteTable('recordings', {
  headset: integer('headset').references(() => headsets.id),
  name: text('name', { length: 256 }),
  time: text('time')
})

export type Recording = typeof recordings.$inferSelect
