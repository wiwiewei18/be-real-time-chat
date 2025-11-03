import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const chatModel = pgTable("chat", {
  id: uuid("id").primaryKey().defaultRandom(),
});

export type ChatModelType = InferSelectModel<typeof chatModel>;
