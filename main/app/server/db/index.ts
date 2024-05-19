import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

export const sqlite = new Database('main.db')
export var db: BetterSQLite3Database = drizzle(sqlite);

export function setDB(newDB: BetterSQLite3Database) {
    db = newDB;
}