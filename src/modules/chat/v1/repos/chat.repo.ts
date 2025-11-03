import { Chat } from "../domains/chat.domain";

export interface ChatRepo {
  save(): Promise<string>;
  getChatsByUserId(userId: string): Promise<Chat[]>;
}
