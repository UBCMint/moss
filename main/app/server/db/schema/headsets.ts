import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const headsets = sqliteTable('headsets', {
  id: integer('id').primaryKey(),
  name: text('name', { length: 256 }),
  description: text('description', { length: 256 }),
  channelNumber: integer('channelNumber'),
  channelList: text('channelList'),
  purpose: text('purpose'),
  portability: text('portability'),
  price: integer('price'),
  company: text('company', { length: 256 }),
  batteryLife: text('batteryLife')
})

export type Headset = typeof headsets.$inferSelect
