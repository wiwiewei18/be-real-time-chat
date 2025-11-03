import { Server } from "socket.io";
import { Message } from "../types/message.type";

export class ChatWSService {
  private onlineUsers: Map<string, string>;

  constructor() {
    this.onlineUsers = new Map();
  }

  public registerUser = (userId: string, webSocketId: string): void => {
    this.onlineUsers.set(userId, webSocketId);
  };

  public unregisterUser = (webSocketId: string): void => {
    for (let [userId, registeredWebSocketId] of this.onlineUsers.entries()) {
      if (registeredWebSocketId === webSocketId) {
        this.onlineUsers.delete(userId);
        break;
      }
    }
  };

  public sendPrivateMessage = (io: Server, message: Message): void => {
    const { receiverId, senderId, content } = message;

    const receiverWebSocketId = this.onlineUsers.get(receiverId);

    if (receiverWebSocketId) {
      io.to(receiverWebSocketId).emit("private_message", {
        senderId,
        content,
        timestamp: new Date().toISOString(),
      });
    }
  };
}
