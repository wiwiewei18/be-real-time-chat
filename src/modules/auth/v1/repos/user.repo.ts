import { eq } from "drizzle-orm";
import { Database } from "../../../../shared/database/database";
import { DBClient } from "../../../../shared/database/postgres/postgresDatabase";
import { userModel, UserModelType } from "../models/user.model";

export class UserRepo {
  private client: DBClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async create(user: Omit<UserModelType, "id">): Promise<void> {
    await this.client.insert(userModel).values(user);
  }

  public async getUserByUsername(
    username: string
  ): Promise<UserModelType | null> {
    const user = await this.client
      .select()
      .from(userModel)
      .where(eq(userModel.username, username))
      .limit(1);

    return user.length ? user[0] : null;
  }
}
