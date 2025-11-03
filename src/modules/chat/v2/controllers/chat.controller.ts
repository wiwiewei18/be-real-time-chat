import { Socket } from "socket.io";
import { ChatService } from "../services/chat.service";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public joinChat = (webSocket: Socket, chatId: string) => {
    this.chatService.joinChat(webSocket, chatId);

    console.log(
      `User with Web Socket id: ${webSocket.id} joined chat room chat:${chatId} successfully`
    );
  };

  public leaveChat = (webSocket: Socket, chatId: string) => {
    this.chatService.leaveChat(webSocket, chatId);

    console.log(
      `User with Web Socket id: ${webSocket.id} left chat room chat:${chatId} successfully`
    );
  };

  public sendMessage = (webSocket: Socket, chatId: string, message: string) => {
    this.chatService.sendMessage(webSocket, chatId, message);

    console.log(
      `User with Web Socket id: ${webSocket.id} sent message to chat room chat:${chatId} successfully`
    );
  };
}
