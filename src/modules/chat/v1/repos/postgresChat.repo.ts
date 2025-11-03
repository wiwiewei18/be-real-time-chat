import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { chatModel } from "../models/chat.model";
import { ChatRepo } from "./chat.repo";

export class PostgresChatRepo implements ChatRepo {
  private client: PostgresClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async save(): Promise<string> {
    const result = await this.client
      .insert(chatModel)
      .values({})
      .returning({ id: chatModel.id });

    return result[0].id;
  }
}
