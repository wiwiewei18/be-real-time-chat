import { Chat } from "../../../chat/v1/domains/chat.domain";
import { ChatDTOType } from "../../../chat/v1/dtos/chat.dto";
import { ChatParticipantMapper } from "../../../chat/v1/mappers/chatParticipant.mapper";
import { ChatModelType } from "../../../chat/v1/models/chat.model";

export class ChatMapper {
  public static toDomain(chatModel: ChatModelType): Chat {
    return new Chat(chatModel.id);
  }

  public static toDTO(chat: Chat): ChatDTOType {
    const participants = chat.getParticipants();

    const mappedParticipants = participants.map((participant) =>
      ChatParticipantMapper.toDTO(participant, participant.getUser())
    );

    return {
      id: chat.id!,
      participants: mappedParticipants,
    };
  }
}
