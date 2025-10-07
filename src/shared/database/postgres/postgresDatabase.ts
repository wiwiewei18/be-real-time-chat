import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { Database } from "../database";

export type DBClient = ReturnType<typeof drizzle>;

export class PostgresDatabase implements Database {
  private static instance: DBClient;

  constructor() {
    if (!PostgresDatabase.instance) {
      const pool = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      PostgresDatabase.instance = drizzle(pool);

      console.log("Database connected to PostgreSQL via Drizzle");
    }
  }

  public getClient(): DBClient {
    return PostgresDatabase.instance;
  }
}
