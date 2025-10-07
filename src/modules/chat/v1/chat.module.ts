import { ChatService } from "./services/chat.service";
import { ChatController } from "./controllers/chat.controller";
import { ChatListener } from "./listeners/chat.listener";

export class ChatModule {
  static buildListener() {
    const chatService = new ChatService();
    const chatController = new ChatController(chatService);
    const chatListener = new ChatListener(chatController);

    return chatListener;
  }
}
