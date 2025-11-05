import { Namespace, Server, Socket } from "socket.io";
import { ChatWSController } from "../controllers/chat.ws.controller";

export class ChatWSListener {
  constructor(private chatWsController: ChatWSController) {}

  public initializeListeners(webSocket: Socket, io: Server | Namespace) {
    webSocket.on("chat:join", (chatId: string) => {
      this.chatWsController.joinChat(webSocket, chatId);
    });

    webSocket.on("chat:leave", async (chatId: string) => {
      await this.chatWsController.leaveChat(webSocket, chatId);
    });

    webSocket.on("chat:message.send", async ({ chatId, content }) => {
      await this.chatWsController.sendMessage(webSocket, chatId, content);
    });
  }
}
