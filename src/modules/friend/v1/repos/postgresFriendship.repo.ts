import { and, eq, or } from "drizzle-orm";
import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { friendshipModel } from "../models/friendship.model";
import { FriendshipRepo } from "./friend.repo";
import { Friendship } from "../domain/friendship.domain";
import { FriendshipMapper } from "../mappers/friendship.mapper";

export class PostgresFriendshipRepo implements FriendshipRepo {
  private client: PostgresClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async create(friendship: Friendship): Promise<void> {
    await this.client
      .insert(friendshipModel)
      .values(FriendshipMapper.toPersistence(friendship));
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
