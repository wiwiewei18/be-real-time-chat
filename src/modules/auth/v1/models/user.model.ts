import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userModel = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password").notNull(),
});

export type UserModelType = InferSelectModel<typeof userModel>;
