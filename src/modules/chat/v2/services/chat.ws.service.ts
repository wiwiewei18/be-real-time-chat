import { Socket } from "socket.io";
import { ChatParticipant } from "../../v1/domains/chatParticipant.domain";
import { ChatParticipantRepo } from "../../v1/repos/chatParticipant.repo";

export class ChatWSService {
  constructor(private chatParticipantRepo: ChatParticipantRepo) {}

  public joinChat = async (
    webSocket: Socket,
    chatId: string
  ): Promise<void> => {
    const existingChatParticipant =
      await this.chatParticipantRepo.getChatParticipantByChatIdAndUserId(
        chatId,
        webSocket.data.user.userId
      );

    if (existingChatParticipant) {
      webSocket.join(`chat:${chatId}`);
      return;
    }

    const chatParticipant = new ChatParticipant(
      chatId,
      webSocket.data.user.userId
    );

    await this.chatParticipantRepo.save(chatParticipant);

    webSocket.join(`chat:${chatId}`);
  };

  public leaveChat = async (
    webSocket: Socket,
    chatId: string
  ): Promise<void> => {
    const chatParticipant =
      await this.chatParticipantRepo.getChatParticipantByChatIdAndUserId(
        chatId,
        webSocket.data.user.userId
      );

    if (!chatParticipant) {
      webSocket.leave(`chat:${chatId}`);
      return;
    }

    await this.chatParticipantRepo.delete(chatParticipant);

    webSocket.leave(`chat:${chatId}`);
  };

  public sendMessage = (
    webSocket: Socket,
    chatId: string,
    message: string
  ): void => {
    webSocket.to(`chat:${chatId}`).emit("chat:message.receive", {
      chatId,
      senderId: webSocket.data.user.userId,
      message,
    });
  };
}
