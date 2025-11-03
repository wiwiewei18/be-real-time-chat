import { ChatParticipant } from "../domains/chatParticipant.domain";

export interface ChatParticipantRepo {
  save(chatParticipant: ChatParticipant): Promise<void>;
  getChatParticipantByChatIdAndUserId(
    chatId: string,
    userId: string
  ): Promise<ChatParticipant | null>;
}
