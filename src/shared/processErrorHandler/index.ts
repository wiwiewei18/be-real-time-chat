import { Server } from "http";
import { ErrorController } from "../http/controllers/error.controller";

export class ProcessErrorHandler {
  private errorController: ErrorController;

  constructor() {
    this.errorController = new ErrorController();
  }

  public handleUncaughtExceptions() {
    process.on("uncaughtException", (error: Error) =>
      this.errorController.handleUncaughtException(error)
    );
  }

  public handleUnhandledRejections(httpServer: Server) {
    process.on("unhandledRejection", (error: Error) =>
      this.errorController.handleUnhandledRejection(error, httpServer)
    );
  }
}
