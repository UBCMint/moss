import type { Config } from 'drizzle-kit'

export default {
  schema: './app/server/db/schema',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './main.db'
  }
} satisfies Config
