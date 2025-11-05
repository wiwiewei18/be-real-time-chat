import { Message } from "../../../chat/v1/domains/message.domain";
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
}
