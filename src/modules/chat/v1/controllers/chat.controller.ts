import { Socket, Server } from "socket.io";
import { ChatService } from "../services/chat.service";
import { Message } from "../types/message.type";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public registerUser = (socket: Socket, userId: string) => {
    const socketId = socket.id;

    this.chatService.registerUser(userId, socketId);

    console.log(
      `User with socket id ${socketId} registered as ${userId} successfully`
    );
  };

  public sendPrivateMessage = (io: Server, message: Message) => {
    const { receiverId, senderId } = message;

    this.chatService.sendPrivateMessage(io, message);

    console.log(
      `Private message from ${senderId} to ${receiverId} sent successfully`
    );
  };

  public disconnect = (socket: Socket) => {
    const socketId = socket.id;

    this.chatService.unregisterUser(socketId);

    console.log(`User with socket id ${socketId} disconnected successfully`);
  };
}
