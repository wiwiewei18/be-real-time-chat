import { Message } from "../domains/message.domain";

export interface MessageRepo {
  save(message: Message): Promise<void>;
  getMessagesByChatId(chatId: string): Promise<Message[]>;
}
