import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

export class ChatRouter {
  public router: Router;

  constructor(private chatController: ChatController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route("/").post(this.chatController.createChat);
  }
}
