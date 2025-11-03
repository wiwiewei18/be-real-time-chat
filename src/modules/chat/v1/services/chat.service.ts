import { ChatDTOType } from "../dtos/chat.dto";
import { ChatRepo } from "../repos/chat.repo";

type CreateChatOutput = {
  chat: ChatDTOType;
};

export class ChatService {
  constructor(private chatRepo: ChatRepo) {}

  public createChat = async (): Promise<CreateChatOutput> => {
    const id = await this.chatRepo.save();

    return {
      chat: {
        id,
      },
    };
  };
}
