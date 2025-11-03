import { Socket } from "socket.io";

export class ChatWSService {
  public joinChat = (webSocket: Socket, chatId: string): void => {
    webSocket.join(`chat:${chatId}`);
  };

  public leaveChat = (webSocket: Socket, chatId: string): void => {
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
