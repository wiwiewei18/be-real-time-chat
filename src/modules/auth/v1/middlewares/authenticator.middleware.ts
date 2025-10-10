import { Socket } from "socket.io";
import { NextFunction, Request, Response } from "express";
import { JWT } from "../../../../shared/utils/jwt";
import CustomError from "../../../../shared/http/utils/CustomError";
import { StatusCode } from "../../../../shared/http/constants/StatusCode";

export class Authenticator {
  public static protectHTTP() {
    return (req: Request, _res: Response, next: NextFunction) => {
      const bearerToken = req.headers.authorization;
      if (!(bearerToken && bearerToken.startsWith("Bearer "))) {
        return next(
          new CustomError(StatusCode.UNAUTHORIZED, "Not authenticated")
        );
      }

      try {
        const token = bearerToken.split(" ")[1];
        const decodedToken = JWT.verify(token);
        (req as any).user = decodedToken;
        next();
      } catch (error: any) {
        next(new CustomError(StatusCode.UNAUTHORIZED, "Not authenticated"));
      }
    };
  }

  public static protectWebSocket() {
    return (socket: Socket, next: (err?: Error) => void) => {
      const token =
        socket.handshake.auth.token || socket.handshake.headers.token;
      if (!token) {
        return next(new Error("Not authenticated"));
      }

      try {
        const decodedToken = JWT.verify(token);
        socket.data.user = decodedToken;
        next();
      } catch (error) {
        next(new Error("Not authenticated"));
      }
    };
  }
}
