import { Socket, Server } from "socket.io";
import { ChatController } from "../controllers/chat.controller";

export class ChatListener {
  constructor(private chatController: ChatController) {}

  public initializeListeners(socket: Socket, io: Server) {
    socket.on("register", (userId: string) => {
      this.chatController.registerUser(socket, userId);
    });

    socket.on("private_message", ({ senderId, receiverId, content }) => {
      this.chatController.sendPrivateMessage(io, {
        senderId,
        receiverId,
        content,
      });
    });

    socket.on("disconnect", () => {
      this.chatController.disconnect(socket);
    });
  }
}
