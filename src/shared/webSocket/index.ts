import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { ChatModule } from "../../modules/chat/v1/chat.module";
import { ChatModule as ChatModuleV2 } from "../../modules/chat/v2/chat.module";
import { ChatWSListener } from "../../modules/chat/v1/listeners/chat.ws.listener";
import { ChatListener as ChatListenerV2 } from "../../modules/chat/v2/listeners/chat.listener";
import { Authenticator } from "../../modules/auth/v1/middlewares/authenticator.middleware";

export class WebSocket {
  public io: Server;
  private port: number;
  private chatWSListener: ChatWSListener;
  private chatListenerV2: ChatListenerV2;

  constructor(server: HttpServer, port: number) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    this.port = port;
    this.chatWSListener = ChatModule.buildListener();
    this.chatListenerV2 = ChatModuleV2.buildListener();
    this.setupListeners();

    console.log(`Socket.io server running on ws://localhost:${this.port}`);
  }

  private setupListeners() {
    const v1Namespace = this.io.of("/");

    v1Namespace.use(Authenticator.protectWebSocket());

    v1Namespace.on("connection", (webSocket) => {
      console.log(
        `User with Web Socket id ${webSocket.id} connected successfully`
      );

      this.chatWSListener.initializeListeners(webSocket, this.io);
    });

    const v2Namespace = this.io.of("/v2");

    v2Namespace.use(Authenticator.protectWebSocket());

    v2Namespace.on("connection", (webSocket) => {
      console.log(
        `User with Web Socket id ${webSocket.id} connected to /v2 namespace successfully`
      );

      this.chatListenerV2.initializeListeners(webSocket, v2Namespace);
    });
  }
}
