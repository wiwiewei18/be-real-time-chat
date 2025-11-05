import { Message } from "../../../chat/v1/domains/message.domain";
import { MessageDTOType } from "../../../chat/v1/dtos/message.dto";
import { MessageModelType } from "../../../chat/v1/models/message.model";

export class MessageMapper {
  public static toPersistence(
    message: Message
  ): Omit<MessageModelType, "id" | "created_at"> {
    return {
      chat_id: message.chatId,
      sender_id: message.senderId,
      content: message.content,
    };
  }

  public static toDomain(messageModel: MessageModelType): Message {
    return new Message(
      messageModel.chat_id,
      messageModel.sender_id,
      messageModel.content,
      messageModel.created_at,
      messageModel.id
    );
  }

  public static toDTO(message: Message): MessageDTOType {
    return {
      id: message.id!,
      chatId: message.chatId,
      senderId: message.senderId,
      content: message.content,
      createdAt: message.createdAt!,
    };
  }
}
