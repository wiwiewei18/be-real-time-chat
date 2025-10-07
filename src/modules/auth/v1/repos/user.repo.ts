import { eq } from "drizzle-orm";
import { Database } from "../../../../shared/database/database";
import { DBClient } from "../../../../shared/database/postgres/postgresDatabase";
import { userSchema, UserSchemaType } from "../schemas/user.schema";

export class UserRepo {
  private client: DBClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async create(user: Omit<UserSchemaType, "id">): Promise<void> {
    await this.client.insert(userSchema).values(user);
  }

  public async getUserByUsername(
    username: string
  ): Promise<UserSchemaType | null> {
    const user = await this.client
      .select()
      .from(userSchema)
      .where(eq(userSchema.username, username))
      .limit(1);

    return user.length ? user[0] : null;
  }
}
