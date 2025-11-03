import { and, eq } from "drizzle-orm";
import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { ChatParticipant } from "../domains/chatParticipant.domain";
import { ChatParticipantMapper } from "../mappers/chatParticipant.mapper";
import { chatParticipantModel } from "../models/chatParticipant.model";
import { ChatParticipantRepo } from "./chatParticipant.repo";

export class PostgresChatParticipantRepo implements ChatParticipantRepo {
  private client: PostgresClient;

  constructor(db: Database) {
    this.client = db.getClient();
  }

  public async save(chatParticipant: ChatParticipant): Promise<void> {
    await this.client
      .insert(chatParticipantModel)
      .values(ChatParticipantMapper.toPersistence(chatParticipant));
  }

  public async getChatParticipantByChatIdAndUserId(
    chatId: string,
    userId: string
  ): Promise<ChatParticipant | null> {
    const chatParticipant = await this.client
      .select()
      .from(chatParticipantModel)
      .where(
        and(
          eq(chatParticipantModel.chat_id, chatId),
          eq(chatParticipantModel.user_id, userId)
        )
      )
      .limit(1);

    return chatParticipant.length
      ? ChatParticipantMapper.toDomain(chatParticipant[0])
      : null;
  }

  public async delete(chatParticipant: ChatParticipant): Promise<void> {
    await this.client
      .delete(chatParticipantModel)
      .where(
        and(
          eq(chatParticipantModel.chat_id, chatParticipant.chatId),
          eq(chatParticipantModel.user_id, chatParticipant.userId)
        )
      );
  }
}
