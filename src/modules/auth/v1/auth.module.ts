import { PostgresDatabase } from "../../../shared/database/postgres/postgresDatabase";
import { PostgresUserRepo } from "./repos/postgresUser.repo";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthRouter } from "./routes/auth.route";

export class AuthModule {
  static buildRouter() {
    const db = new PostgresDatabase();
    const userRepo = new PostgresUserRepo(db);
    const authService = new AuthService(userRepo);
    const authController = new AuthController(authService);
    const authRouter = new AuthRouter(authController);

    return authRouter.router;
  }
}
