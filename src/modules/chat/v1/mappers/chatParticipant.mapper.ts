import { ChatParticipant } from "../domains/chatParticipant.domain";
import { ChatParticipantModelType } from "../models/chatParticipant.model";

export class ChatParticipantMapper {
  public static toPersistence(
    chatParticipant: ChatParticipant
  ): Omit<ChatParticipantModelType, "id"> {
    return {
      chat_id: chatParticipant.chatId,
      user_id: chatParticipant.userId,
    };
  }

  public static toDomain(
    chatParticipantModel: ChatParticipantModelType
  ): ChatParticipant {
    return new ChatParticipant(
      chatParticipantModel.chat_id,
      chatParticipantModel.user_id,
      chatParticipantModel.id
    );
  }
}
