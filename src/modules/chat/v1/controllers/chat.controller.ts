import { Socket, Server } from "socket.io";
import { ChatService } from "../services/chat.service";
import { Message } from "../types/message.type";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public registerUser = (webSocket: Socket, userId: string) => {
    const webSocketId = webSocket.id;

    this.chatService.registerUser(userId, webSocketId);

    console.log(
      `User with web socket id ${webSocketId} registered as ${userId} successfully`
    );
  };

  public sendPrivateMessage = (io: Server, message: Message) => {
    const { receiverId, senderId } = message;

    this.chatService.sendPrivateMessage(io, message);

    console.log(
      `Private message from ${senderId} to ${receiverId} sent successfully`
    );
  };

  public disconnect = (webSocket: Socket) => {
    const webSocketId = webSocket.id;

    this.chatService.unregisterUser(webSocketId);

    console.log(
      `User with web socket id ${webSocketId} disconnected successfully`
    );
  };
}
