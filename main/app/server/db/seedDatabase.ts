import { db, sqlite } from "@/app/server/db/index";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import { users } from "@/app/server/db/schema";
import fs from "fs/promises";
import * as readline from "readline";
import Database from "better-sqlite3";

let sqlite: Database;
let db: BetterSQLite3Database;

const numberOfUsers = 10;
const randomUserUsernames: string[] = [
  "amazing-anteater",
  "cool-crab",
  "dapper-dolphin",
  "great-giraffe",
  "perfect-panda",
  "lazy-leopard",
  "cute-capybara",
  "playful-platypus",
  "nice-narwhal",
  "friendly-frog",
];
const randomUserPasswords: string[] = [
  "mytseryPass",
  "ObscureString",
  "encrypted_letters",
  "secret-signal",
  "mot-de-passe",
  "id unknown",
  "contrasena",
  "parola-d'ordine",
  "enigmaticKey",
  "pasuwado",
];
const randomUserRoles: string[] = [
  "Software Engineer",
  "Product Manager",
  "Electrical Engineer",
  "Web Developer",
  "VP Engineering",
  "UX Designer",
  "Signals Engineer",
  "Data Scientist",
  "Neuroscience Researcher",
  "Clinician",
];

async function addUsers(): Promise<void> {
  for (let i: number = 0; i < numberOfUsers; i++) {
    await db.insert(users).values({
      username: randomUserUsernames[i],
      password: randomUserPasswords[i],
      email: randomUserUsernames[i] + "" + "@mail.com",
      role: randomUserRoles[i],
    });
  }
}

const promptUser = async (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    rl.question(query, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
};

function initializeDatabase() {
  sqlite = new Database("main.db");
  db = drizzle(sqlite);
}

function closeDatabase() {
  if (sqlite) {
    sqlite.close();
  }
}

async function resetDB(filePath: string, retries: number = 3) {
  try {
    closeDatabase();
    try {
      await fs.unlink(filePath);
      return;
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

const seedDatabase = async (): Promise<void> => {
  const input = await promptUser(
    "This script will reset the database. Do you want to proceed? [y/n] "
  );

  switch (input.toLowerCase()) {
    case "y":
      console.log("🔄 Seeding the database...");
      // await db.delete(users)

      await resetDB("./main.db");
      initializeDatabase();

      const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `;
      sqlite.exec(createUsersTableQuery);

      void addUsers();
      console.log("✅ Database seeded successfully.");
      break;
    case "n":
      console.log("🚫 Exiting the script... The database remains untouched.");
      break;
    default:
      console.log(
        "🚫 Invalid input. Exiting the script... The database remains untouched."
      );
  }
};

void seedDatabase();
