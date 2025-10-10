import { PostgresDatabase } from "../../../shared/database/postgres/postgresDatabase";
import { PostgresUserRepo } from "../../auth/v1/repos/postgresUser.repo";
import { FriendController } from "./controllers/friend.controller";
import { PostgresFriendshipRepo } from "./repos/postgresFriendship.repo";
import { FriendRouter } from "./routes/friend.route";
import { FriendService } from "./services/friend.service";

export class FriendModule {
  static buildRouter() {
    const db = new PostgresDatabase();
    const userRepo = new PostgresUserRepo(db);
    const friendshipRepo = new PostgresFriendshipRepo(db);
    const friendService = new FriendService(userRepo, friendshipRepo);
    const friendController = new FriendController(friendService);
    const friendRouter = new FriendRouter(friendController);

    return friendRouter.router;
  }
}
