import { InferSelectModel } from "drizzle-orm";
import { pgTable, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const friendshipModel = pgTable(
  "friendship",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requester_id: varchar("requester_id", { length: 36 }).notNull(),
    receiver_id: varchar("receiver_id", { length: 36 }).notNull(),
    status: varchar("status", { length: 255 }).notNull(),
  },
  (table) => [
    uniqueIndex("friendship_requester_receiver_idx").on(
      table.requester_id,
      table.receiver_id
    ),
  ]
);

export type FriendshipModelType = InferSelectModel<typeof friendshipModel>;
