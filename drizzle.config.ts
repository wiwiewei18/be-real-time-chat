import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    ssl: false,
  },
  schema: "./src/modules/**/models/*.ts",
  dialect: "postgresql",
  out: "./src/shared/database/postgres/migrations",
});
