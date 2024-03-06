import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(), 
  username: varchar("username", { length: 256 }),
});

export type User = typeof users.$inferSelect;