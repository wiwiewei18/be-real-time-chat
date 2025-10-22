import { eq } from "drizzle-orm";
import { UserRepo } from "./user.repo";
import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { userModel } from "../models/user.model";
import { User } from "../domains/user.domain";
import { UserMapper } from "../mappers/user.mapper";

export class PostgresUserRepo implements UserRepo {
  private client: PostgresClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async create(user: User): Promise<void> {
    await this.client.insert(userModel).values(UserMapper.toPersistence(user));
  }

  public async getUserByUserId(userId: string): Promise<User | null> {
    const user = await this.client
      .select()
      .from(userModel)
      .where(eq(userModel.id, userId))
      .limit(1);

    return user.length ? UserMapper.toDomain(user[0]) : null;
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.client
      .select()
      .from(userModel)
      .where(eq(userModel.username, username))
      .limit(1);

    return user.length ? UserMapper.toDomain(user[0]) : null;
  }
}
