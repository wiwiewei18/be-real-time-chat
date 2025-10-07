import { PostgresDatabase } from "../../../shared/database/postgres/postgresDatabase";
import { UserRepo } from "./repos/user.repo";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthRouter } from "./routes/auth.route";

export class AuthModule {
  static buildRouter() {
    const db = new PostgresDatabase();
    const userRepo = new UserRepo(db);
    const authService = new AuthService(userRepo);
    const authController = new AuthController(authService);
    const authRouter = new AuthRouter(authController);

    return authRouter.router;
  }
}
