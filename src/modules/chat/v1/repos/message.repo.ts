import { Message } from "../domains/message.domain";

export interface MessageRepo {
  save(message: Message): Promise<Message>;
  getMessagesByChatId(chatId: string): Promise<Message[]>;
}
