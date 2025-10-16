import { Router } from "express";
import { FriendController } from "../controllers/friend.controller";
import { Authenticator } from "../../../auth/v1/middlewares/authenticator.middleware";
import { Validator } from "../../../../shared/http/middlewares/validator.middleware";
import { sendFriendRequestBodySchema } from "../validations/sendFriendRequest.validation";
import { acceptFriendRequestParamsSchema } from "../validations/acceptFriendRequest.validation";

export class FriendRouter {
  public router: Router;

  constructor(private friendController: FriendController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/request")
      .post(
        Authenticator.protectHTTP(),
        Validator.validateBody(sendFriendRequestBodySchema),
        this.friendController.sendFriendRequest
      );

    this.router
      .route("/request/:friendRequestId/accept")
      .post(
        Authenticator.protectHTTP(),
        Validator.validateParams(acceptFriendRequestParamsSchema),
        this.friendController.acceptFriendRequest
      );
  }
}
