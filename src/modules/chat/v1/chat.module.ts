import { PostgresChatRepo } from "./repos/postgresChat.repo";
import { PostgresDatabase } from "../../../shared/database/postgres/postgresDatabase";
import { ChatService } from "./services/chat.service";
import { ChatController } from "./controllers/chat.controller";
import { ChatRouter } from "./routes/chat.route";
import { ChatWSService } from "./services/chat.ws.service";
import { ChatWSController } from "./controllers/chat.ws.controller";
import { ChatWSListener } from "./listeners/chat.ws.listener";
import { PostgresUserRepo } from "../../auth/v1/repos/postgresUser.repo";
import { PostgresChatParticipantRepo } from "./repos/postgresChatParticipant.repo";
import { PostgresMessageRepo } from "./repos/postgresMessage.repo";

export class ChatModule {
  static buildRouter() {
    const db = new PostgresDatabase();
    const userRepo = new PostgresUserRepo(db);
    const chatRepo = new PostgresChatRepo(db);
    const chatParticipantRepo = new PostgresChatParticipantRepo(db);
    const messageRepo = new PostgresMessageRepo(db);
    const chatService = new ChatService(
      userRepo,
      chatRepo,
      chatParticipantRepo,
      messageRepo
    );
    const chatController = new ChatController(chatService);
    const chatRouter = new ChatRouter(chatController);

    return chatRouter.router;
  }

  static buildListener() {
    const chatWSService = new ChatWSService();
    const chatWSController = new ChatWSController(chatWSService);
    const chatWSListener = new ChatWSListener(chatWSController);

    return chatWSListener;
  }
}
