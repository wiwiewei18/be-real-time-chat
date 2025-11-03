import { Socket, Server } from "socket.io";
import { ChatWSService } from "../services/chat.ws.service";
import { Message } from "../types/message.type";

export class ChatWSController {
  constructor(private chatWSService: ChatWSService) {}

  public registerUser = (webSocket: Socket, userId: string) => {
    const webSocketId = webSocket.id;

    this.chatWSService.registerUser(userId, webSocketId);

    console.log(
      `User with web socket id ${webSocketId} registered as ${userId} successfully`
    );
  };

  public sendPrivateMessage = (io: Server, message: Message) => {
    const { receiverId, senderId } = message;

    this.chatWSService.sendPrivateMessage(io, message);

    console.log(
      `Private message from ${senderId} to ${receiverId} sent successfully`
    );
  };

  public disconnect = (webSocket: Socket) => {
    const webSocketId = webSocket.id;

    this.chatWSService.unregisterUser(webSocketId);

    console.log(
      `User with web socket id ${webSocketId} disconnected successfully`
    );
  };
}
