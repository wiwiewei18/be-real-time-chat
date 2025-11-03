import { ChatWSController } from "./controllers/chat.ws.controller";
import { ChatWSListener } from "./listeners/chat.ws.listener";
import { ChatWSService } from "./services/chat.ws.service";

export class ChatModule {
  static buildListener() {
    const chatWSService = new ChatWSService();
    const chatWSController = new ChatWSController(chatWSService);
    const chatWSListener = new ChatWSListener(chatWSController);

    return chatWSListener;
  }
}
