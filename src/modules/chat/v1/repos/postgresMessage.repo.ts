import { asc, eq } from "drizzle-orm";
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

  public async save(message: Message): Promise<Message> {
    const result = await this.client
      .insert(messageModel)
      .values(MessageMapper.toPersistence(message))
      .returning();

    return MessageMapper.toDomain(result[0]);
  }

  public async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const messageList = await this.client
      .select()
      .from(messageModel)
      .where(eq(messageModel.chat_id, chatId))
      .orderBy(asc(messageModel.created_at));

    return messageList.map((message) => MessageMapper.toDomain(message));
  }
}
