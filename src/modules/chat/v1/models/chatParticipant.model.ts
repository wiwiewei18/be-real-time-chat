import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { chatModel } from "./chat.model";
import { userModel } from "../../../auth/v1/models/user.model";

export const chatParticipantModel = pgTable("chat_participant", {
  id: uuid("id").primaryKey().defaultRandom(),
  chat_id: uuid("chat_id")
    .notNull()
    .references(() => chatModel.id, { onDelete: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => userModel.id, { onDelete: "cascade" }),
});

export type ChatParticipantModelType = InferSelectModel<
  typeof chatParticipantModel
>;
