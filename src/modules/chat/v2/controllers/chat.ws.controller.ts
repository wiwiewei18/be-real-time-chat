import { Socket } from "socket.io";
import { ChatWSService } from "../services/chat.ws.service";

export class ChatWSController {
  constructor(private chatWSService: ChatWSService) {}

  public joinChat = (webSocket: Socket, chatId: string) => {
    this.chatWSService.joinChat(webSocket, chatId);

    console.log(
      `User with Web Socket id: ${webSocket.id} joined chat room chat:${chatId} successfully`
    );
  };

  public leaveChat = (webSocket: Socket, chatId: string) => {
    this.chatWSService.leaveChat(webSocket, chatId);

    console.log(
      `User with Web Socket id: ${webSocket.id} left chat room chat:${chatId} successfully`
    );
  };

  public sendMessage = (webSocket: Socket, chatId: string, message: string) => {
    this.chatWSService.sendMessage(webSocket, chatId, message);

    console.log(
      `User with Web Socket id: ${webSocket.id} sent message to chat room chat:${chatId} successfully`
    );
  };
}
