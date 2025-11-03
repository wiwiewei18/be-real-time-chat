import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { Authenticator } from "../../../auth/v1/middlewares/authenticator.middleware";

export class ChatRouter {
  public router: Router;

  constructor(private chatController: ChatController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/")
      .post(Authenticator.protectHTTP(), this.chatController.createChat)
      .get(Authenticator.protectHTTP(), this.chatController.getChats);
  }
}
