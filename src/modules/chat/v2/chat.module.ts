import { PostgresDatabase } from "../../../shared/database/postgres/postgresDatabase";
import { PostgresChatParticipantRepo } from "../v1/repos/postgresChatParticipant.repo";
import { ChatWSController } from "./controllers/chat.ws.controller";
import { ChatWSListener } from "./listeners/chat.ws.listener";
import { ChatWSService } from "./services/chat.ws.service";

export class ChatModule {
  static buildListener() {
    const db = new PostgresDatabase();
    const chatParticipantRepo = new PostgresChatParticipantRepo(db);
    const chatWSService = new ChatWSService(chatParticipantRepo);
    const chatWSController = new ChatWSController(chatWSService);
    const chatWSListener = new ChatWSListener(chatWSController);

    return chatWSListener;
  }
}
