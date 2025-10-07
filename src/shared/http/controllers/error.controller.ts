import { Request, Response, NextFunction } from "express";
import { Server } from "http";
import { StatusCode } from "../constants/StatusCode";
import { ResponseStatus } from "../constants/ResponseStatus";
import CustomError from "../utils/CustomError";

export class ErrorController {
  private developmentResponse = (res: Response, error: CustomError) => {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stackTrace: error.stack,
      error,
    });
  };

  private productionResponse = (res: Response, error: CustomError) => {
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.ERROR,
        message: "Something went wrong! Please, try again later.",
      });
    }
  };

  public handleGlobalError = (
    error: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    error.statusCode = error.statusCode ?? StatusCode.INTERNAL_SERVER_ERROR;
    error.status = error.status ?? ResponseStatus.ERROR;

    if (process.env.NODE_ENV === "development") {
      this.developmentResponse(res, error);
    } else {
      this.productionResponse(res, error);
    }
  };

  public handleUncaughtException = (error: Error) => {
    console.log("Uncaught exception occurred! shutting down..");
    console.log(error.name, error.message);

    process.exit(1);
  };

  public handleUnhandledRejection = (error: Error, server: Server) => {
    console.log("Unhandled rejection occurred! shutting down..");
    console.log(error.name, error.message);

    server.close(() => {
      process.exit(1);
    });
  };

  public handleNotFoundRoute = (
    req: Request,
    _res: Response,
    _next: NextFunction
  ) => {
    throw new CustomError(
      StatusCode.NOT_FOUND,
      `Can't find ${req.originalUrl} on this server!`
    );
  };
}
