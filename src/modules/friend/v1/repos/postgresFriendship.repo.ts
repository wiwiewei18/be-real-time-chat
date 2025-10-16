import { and, eq, or } from "drizzle-orm";
import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { friendshipModel } from "../models/friendship.model";
import { FriendshipRepo } from "./friendship.repo";
import { Friendship } from "../domains/friendship.domain";
import { FriendshipMapper } from "../mappers/friendship.mapper";

export class PostgresFriendshipRepo implements FriendshipRepo {
  private client: PostgresClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async save(friendship: Friendship): Promise<void> {
    await this.client
      .insert(friendshipModel)
      .values(FriendshipMapper.toPersistence(friendship))
      .onConflictDoUpdate({
        target: [friendshipModel.requester_id, friendshipModel.receiver_id],
        set: {
          status: friendship.getStatus(),
        },
      });
  }

  public async getFriendshipById(id: string): Promise<Friendship | null> {
    const friendship = await this.client
      .select()
      .from(friendshipModel)
      .where(eq(friendshipModel.id, id))
      .limit(1);

    return friendship.length ? FriendshipMapper.toDomain(friendship[0]) : null;
  }

  public async getFriendshipBetweenTwoUsers(
    user1Id: string,
    user2Id: string
  ): Promise<Friendship | null> {
    const friendship = await this.client
      .select()
      .from(friendshipModel)
      .where(
        or(
          and(
            eq(friendshipModel.requester_id, user1Id),
            eq(friendshipModel.receiver_id, user2Id)
          ),
          and(
            eq(friendshipModel.requester_id, user2Id),
            eq(friendshipModel.receiver_id, user1Id)
          )
        )
      )
      .limit(1);

    return friendship.length ? FriendshipMapper.toDomain(friendship[0]) : null;
  }
}
