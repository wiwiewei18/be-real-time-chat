import { Socket, Server } from "socket.io";
import { ChatWSController } from "../controllers/chat.ws.controller";

export class ChatWSListener {
  constructor(private chatWSController: ChatWSController) {}

  public initializeListeners(webSocket: Socket, io: Server) {
    webSocket.on("register", (userId: string) => {
      this.chatWSController.registerUser(webSocket, userId);
    });

    webSocket.on("private_message", ({ senderId, receiverId, content }) => {
      this.chatWSController.sendPrivateMessage(io, {
        senderId,
        receiverId,
        content,
      });
    });

    webSocket.on("disconnect", () => {
      this.chatWSController.disconnect(webSocket);
    });
  }
}
