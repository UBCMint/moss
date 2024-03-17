import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users } from './schema';

const sqlite = new Database('main.db');
export const db: BetterSQLite3Database = drizzle(sqlite);