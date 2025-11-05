import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chatModel } from "./chat.model";
import { userModel } from "../../../auth/v1/models/user.model";
import { InferSelectModel } from "drizzle-orm";

export const messageModel = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  chat_id: uuid("chat_id")
    .notNull()
    .references(() => chatModel.id, { onDelete: "cascade" }),
  sender_id: uuid("sender_id")
    .notNull()
    .references(() => userModel.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type MessageModelType = InferSelectModel<typeof messageModel>;
