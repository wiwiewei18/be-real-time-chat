import { InferSelectModel } from "drizzle-orm";
import { pgTable, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { userModel } from "../../../auth/v1/models/user.model";

export const friendshipModel = pgTable(
  "friendship",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requester_id: uuid("requester_id")
      .notNull()
      .references(() => userModel.id, { onDelete: "cascade" }),
    receiver_id: uuid("receiver_id")
      .notNull()
      .references(() => userModel.id, { onDelete: "cascade" }),
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
