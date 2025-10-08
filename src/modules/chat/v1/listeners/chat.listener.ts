import { Socket, Server } from "socket.io";
import { ChatController } from "../controllers/chat.controller";

export class ChatListener {
  constructor(private chatController: ChatController) {}

  public initializeListeners(webSocket: Socket, io: Server) {
    webSocket.on("register", (userId: string) => {
      this.chatController.registerUser(webSocket, userId);
    });

    webSocket.on("private_message", ({ senderId, receiverId, content }) => {
      this.chatController.sendPrivateMessage(io, {
        senderId,
        receiverId,
        content,
      });
    });

    webSocket.on("disconnect", () => {
      this.chatController.disconnect(webSocket);
    });
  }
}
