import { db } from "@/app/server/db/index";
import { users } from "@/app/server/db/schema";
import fs from "fs/promises";
import * as readline from "readline";

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

async function resetDB(filePath: string) {
  try {
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      console.log("deletrting")

      await fs.unlink(filePath);
    }
  } catch (err) {
    console.error('Error deleting file:', err);
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

      // void addUsers();
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
