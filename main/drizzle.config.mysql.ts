import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/localDB/schema",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
  },
} satisfies Config;
