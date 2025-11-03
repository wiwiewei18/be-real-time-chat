import { Namespace, Server, Socket } from "socket.io";
import { ChatWSController } from "../controllers/chat.ws.controller";

export class ChatWSListener {
  constructor(private chatWsController: ChatWSController) {}

  public initializeListeners(webSocket: Socket, io: Server | Namespace) {
    webSocket.on("chat:join", async (chatId: string) => {
      await this.chatWsController.joinChat(webSocket, chatId);
    });

    webSocket.on("chat:leave", (chatId: string) => {
      this.chatWsController.leaveChat(webSocket, chatId);
    });

    webSocket.on("chat:message.send", ({ chatId, message }) => {
      this.chatWsController.sendMessage(webSocket, chatId, message);
    });
  }
}
