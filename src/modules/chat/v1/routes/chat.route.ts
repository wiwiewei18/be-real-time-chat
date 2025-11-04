import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { Authenticator } from "../../../auth/v1/middlewares/authenticator.middleware";
import { Validator } from "../../../../shared/http/middlewares/validator.middleware";
import { createChatBodySchema } from "../validations/createChat.validation";

export class ChatRouter {
  public router: Router;

  constructor(private chatController: ChatController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/")
      .post(
        Authenticator.protectHTTP(),
        Validator.validateBody(createChatBodySchema),
        this.chatController.createChat
      )
      .get(Authenticator.protectHTTP(), this.chatController.getChats);
  }
}
