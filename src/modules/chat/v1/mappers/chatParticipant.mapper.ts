import { User } from "../../../auth/v1/domains/user.domain";
import { UserMapper } from "../../../auth/v1/mappers/user.mapper";
import { UserModelType } from "../../../auth/v1/models/user.model";
import { ChatParticipant } from "../domains/chatParticipant.domain";
import { ChatParticipantDTOType } from "../dtos/chatParticipant.dto";
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
    chatParticipantModel: ChatParticipantModelType,
    userModel?: UserModelType
  ): ChatParticipant {
    const chatParticipant = new ChatParticipant(
      chatParticipantModel.chat_id,
      chatParticipantModel.user_id,
      chatParticipantModel.id
    );

    if (userModel) {
      chatParticipant.setUser(UserMapper.toDomain(userModel));
    }

    return chatParticipant;
  }

  public static toDTO(
    chatParticipant: ChatParticipant,
    user?: User
  ): ChatParticipantDTOType {
    return {
      id: chatParticipant.id!,
      user: user ? UserMapper.toDTO(user) : undefined,
    };
  }
}
