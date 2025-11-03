import { ChatMapper } from "../../../friend/v1/mappers/chat.mapper";
import { ChatDTOType } from "../dtos/chat.dto";
import { ChatRepo } from "../repos/chat.repo";

type CreateChatOutput = {
  chat: ChatDTOType;
};

type GetChatsOutput = {
  chats: ChatDTOType[];
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

  public getChats = async (userId: string): Promise<GetChatsOutput> => {
    const chatList = await this.chatRepo.getChatsByUserId(userId);

    return {
      chats: chatList.map((chat) => ChatMapper.toDTO(chat)),
    };
  };
}
