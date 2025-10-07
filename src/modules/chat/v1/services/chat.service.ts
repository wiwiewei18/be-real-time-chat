import { Server } from "socket.io";
import { Message } from "../types/message.type";

export class ChatService {
  private onlineUsers: Map<string, string>;

  constructor() {
    this.onlineUsers = new Map();
  }

  public registerUser = (userId: string, socketId: string): void => {
    this.onlineUsers.set(userId, socketId);
  };

  public unregisterUser = (socketId: string): void => {
    for (let [userId, registeredSocketId] of this.onlineUsers.entries()) {
      if (registeredSocketId === socketId) {
        this.onlineUsers.delete(userId);
        break;
      }
    }
  };

  public sendPrivateMessage = (io: Server, message: Message): void => {
    const { receiverId, senderId, content } = message;

    const receiverSocketId = this.onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("private_message", {
        senderId,
        content,
        timestamp: new Date().toISOString(),
      });
    }
  };
}
