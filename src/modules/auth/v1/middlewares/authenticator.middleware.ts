import { Socket } from "socket.io";
import { JWT } from "../../../../shared/utils/jwt";

export class Authenticator {
  static protectWebSocket() {
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
