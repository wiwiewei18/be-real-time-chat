import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { MessageMapper } from "../../../friend/v1/mappers/message.mapper";
import { Message } from "../domains/message.domain";
import { messageModel } from "../models/message.model";
import { MessageRepo } from "./message.repo";

export class PostgresMessageRepo implements MessageRepo {
  private client: PostgresClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async save(message: Message): Promise<void> {
    await this.client
      .insert(messageModel)
      .values(MessageMapper.toPersistence(message));
  }
}
