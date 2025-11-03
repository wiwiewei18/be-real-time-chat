import http, { Server } from "http";
import express, { Application } from "express";
import cors from "cors";
import { ErrorController } from "../http/controllers/error.controller";
import { HealthModule } from "../../modules/health/v1/health.module";
import { AuthModule } from "../../modules/auth/v1/auth.module";
import { FriendModule } from "../../modules/friend/v1/friend.module";
import { ChatModule } from "../../modules/chat/v1/chat.module";

export class App {
  public app: Application;
  public server: Server;
  private errorController: ErrorController;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.errorController = new ErrorController();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this.app.use(
      cors({
        origin: "*",
        methods: "*",
        credentials: true,
      })
    );
    this.app.use(express.json());
  }

  private setupRoutes() {
    this.app.use("/api/v1/health", HealthModule.buildRouter());
    this.app.use("/api/v1/auth", AuthModule.buildRouter());
    this.app.use("/api/v1/friends", FriendModule.buildRouter());
    this.app.use("/api/v1/chats", ChatModule.buildRouter());
    this.app.all("*path", this.errorController.handleNotFoundRoute);
    this.app.use(this.errorController.handleGlobalError);
  }
}
