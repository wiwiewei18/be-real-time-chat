import { eq, inArray, sql } from "drizzle-orm";
import { Database } from "../../../../shared/database/database";
import { PostgresClient } from "../../../../shared/database/postgres/postgresDatabase";
import { Chat } from "../domains/chat.domain";
import { chatModel } from "../models/chat.model";
import { chatParticipantModel } from "../models/chatParticipant.model";
import { ChatRepo } from "./chat.repo";
import { userModel } from "../../../auth/v1/models/user.model";
import { ChatParticipantMapper } from "../mappers/chatParticipant.mapper";
import { ChatMapper } from "../../../friend/v1/mappers/chat.mapper";

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

  public async getChatsByUserId(userId: string): Promise<Chat[]> {
    const userChatIds = await this.client
      .select({
        chatId: chatParticipantModel.chat_id,
      })
      .from(chatParticipantModel)
      .where(eq(chatParticipantModel.user_id, userId));

    const chatIds = userChatIds.map((item) => item.chatId);

    if (!chatIds.length) {
      return [];
    }

    const chats = await this.client
      .select({
        id: chatModel.id,
        chatParticipant: chatParticipantModel,
        user: userModel,
      })
      .from(chatModel)
      .innerJoin(
        chatParticipantModel,
        eq(chatParticipantModel.chat_id, chatModel.id)
      )
      .innerJoin(userModel, eq(userModel.id, chatParticipantModel.user_id))
      .where(inArray(chatModel.id, chatIds));

    const chatMap = new Map<string, Chat>();

    for (const chat of chats) {
      if (!chatMap.has(chat.id)) {
        chatMap.set(chat.id, ChatMapper.toDomain(chat));
      }

      const chatEntity = chatMap.get(chat.id);

      const isUserItSelf = userId === chat.chatParticipant.user_id;

      if (chatEntity && !isUserItSelf) {
        chatEntity.addParticipant(
          ChatParticipantMapper.toDomain(chat.chatParticipant, chat.user)
        );
      }
    }

    return Array.from(chatMap.values());
  }

  public async getChatIdByUserIds(userIds: string[]): Promise<string | null> {
    const result = await this.client
      .select({ chatId: chatParticipantModel.chat_id })
      .from(chatParticipantModel)
      .where(inArray(chatParticipantModel.user_id, userIds))
      .groupBy(chatParticipantModel.chat_id)
      .having(
        sql`COUNT(DISTINCT ${chatParticipantModel.user_id}) = ${userIds.length}`
      );

    return result.length ? result[0].chatId : null;
  }
}
