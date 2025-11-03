import { Namespace, Server, Socket } from "socket.io";
import { ChatController } from "../controllers/chat.controller";

export class ChatListener {
  constructor(private chatController: ChatController) {}

  public initializeListeners(webSocket: Socket, io: Server | Namespace) {
    webSocket.on("chat:join", (chatId: string) => {
      this.chatController.joinChat(webSocket, chatId);
    });

    webSocket.on("chat:leave", (chatId: string) => {
      this.chatController.leaveChat(webSocket, chatId);
    });

    webSocket.on("chat:message.send", ({ chatId, message }) => {
      this.chatController.sendMessage(webSocket, chatId, message);
    });
  }
}
