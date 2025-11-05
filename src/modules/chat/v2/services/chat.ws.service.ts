import { Socket } from "socket.io";
import { ChatParticipantRepo } from "../../v1/repos/chatParticipant.repo";
import { Message } from "../../v1/domains/message.domain";
import { MessageRepo } from "../../v1/repos/message.repo";
import { MessageMapper } from "../../../friend/v1/mappers/message.mapper";

export class ChatWSService {
  constructor(
    private chatParticipantRepo: ChatParticipantRepo,
    private messageRepo: MessageRepo
  ) {}

  public joinChat = (webSocket: Socket, chatId: string): void => {
    // TODO:
    // validate if participant of the room

    webSocket.join(`chat:${chatId}`);
  };

  public leaveChat = (webSocket: Socket, chatId: string): void => {
    // TODO:
    // validate if participant of the room

    webSocket.leave(`chat:${chatId}`);
  };

  public sendMessage = async (
    webSocket: Socket,
    chatId: string,
    content: string
  ): Promise<void> => {
    const senderId = webSocket.data.user.userId;
    // TODO:
    // validate chat
    // validate participant

    const message = new Message(chatId, senderId, content);

    const storedMessage = await this.messageRepo.save(message);

    webSocket
      .to(`chat:${chatId}`)
      .emit("chat:message.receive", MessageMapper.toDTO(storedMessage));
  };
}
