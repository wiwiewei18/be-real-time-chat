import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { ChatModule } from "../../modules/chat/v1/chat.module";
import { ChatListener } from "../../modules/chat/v1/listeners/chat.listener";
import { Authenticator } from "../../modules/auth/v1/middlewares/authenticator.middleware";

export class Socket {
  public io: Server;
  private port: number;
  private chatListener: ChatListener;

  constructor(server: HttpServer, port: number) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    this.port = port;
    this.chatListener = ChatModule.buildListener();
    this.setupListeners();

    console.log(`Socket.io server running on ws://localhost:${this.port}`);
  }

  private setupListeners() {
    this.io.use(Authenticator.protectSocket());

    this.io.on("connection", (socket) => {
      console.log(`User with socket id ${socket.id} connected successfully`);

      this.chatListener.initializeListeners(socket, this.io);
    });
  }
}
