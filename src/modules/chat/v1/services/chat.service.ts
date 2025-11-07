import { StatusCode } from "../../../../shared/http/constants/StatusCode";
import CustomError from "../../../../shared/http/utils/CustomError";
import { UserRepo } from "../../../auth/v1/repos/user.repo";
import { ChatMapper } from "../../../friend/v1/mappers/chat.mapper";
import { MessageMapper } from "../../../friend/v1/mappers/message.mapper";
import { ChatParticipant } from "../domains/chatParticipant.domain";
import { ChatDTOType } from "../dtos/chat.dto";
import { MessageDTOType } from "../dtos/message.dto";
import { ChatRepo } from "../repos/chat.repo";
import { ChatParticipantRepo } from "../repos/chatParticipant.repo";
import { MessageRepo } from "../repos/message.repo";
import { createChatInput } from "../validations/createChat.validation";
import { GetMessagesInput } from "../validations/getMessages.validation";

type CreateChatOutput = {
  chat: ChatDTOType;
};

type GetChatsOutput = {
  chats: ChatDTOType[];
};

type GetMessagesOutput = { messages: MessageDTOType[] };

export class ChatService {
  constructor(
    private userRepo: UserRepo,
    private chatRepo: ChatRepo,
    private chatParticipantRepo: ChatParticipantRepo,
    private messageRepo: MessageRepo
  ) {}

  public createChat = async (
    createChatInput: createChatInput
  ): Promise<CreateChatOutput> => {
    const { participantUserIds } = createChatInput;

    const users = await Promise.all(
      participantUserIds.map((userId) => this.userRepo.getUserByUserId(userId))
    );

    const notFoundUserIndex = users.findIndex((user) => !user);
    if (notFoundUserIndex !== -1) {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `User not found: ${participantUserIds[notFoundUserIndex]}`
      );
    }

    const chatIdByUserIds = await this.chatRepo.getChatIdByUserIds(
      participantUserIds
    );

    if (chatIdByUserIds) {
      return {
        chat: {
          id: chatIdByUserIds,
        },
      };
    }

    const chatId = await this.chatRepo.save();

    const chatParticipants = participantUserIds.map(
      (userId) => new ChatParticipant(chatId, userId)
    );

    await Promise.all(
      chatParticipants.map((participant) =>
        this.chatParticipantRepo.save(participant)
      )
    );

    return {
      chat: {
        id: chatId,
      },
    };
  };

  public getChats = async (userId: string): Promise<GetChatsOutput> => {
    const chatList = await this.chatRepo.getChatsByUserId(userId);

    return {
      chats: chatList.map((chat) => ChatMapper.toDTO(chat)),
    };
  };

  public getMessages = async (
    getMessagesInput: GetMessagesInput
  ): Promise<GetMessagesOutput> => {
    const messageList = await this.messageRepo.getMessagesByChatId(
      getMessagesInput.id
    );

    return {
      messages: messageList.map((message) => MessageMapper.toDTO(message)),
    };
  };
}
