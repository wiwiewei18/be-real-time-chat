import { Router } from "express";
import { FriendController } from "../controllers/friend.controller";
import { Authenticator } from "../../../auth/v1/middlewares/authenticator.middleware";
import { Validator } from "../../../../shared/http/middlewares/validator.middleware";
import { sendFriendRequestBodySchema } from "../validations/sendFriendRequest.validation";
import { acceptFriendRequestParamsSchema } from "../validations/acceptFriendRequest.validation";
import { rejectFriendRequestParamsSchema } from "../validations/rejectFriendRequest.validation";

export class FriendRouter {
  public router: Router;

  constructor(private friendController: FriendController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route("/requests")
      .post(
        Authenticator.protectHTTP(),
        Validator.validateBody(sendFriendRequestBodySchema),
        this.friendController.sendFriendRequest
      )
      .get(
        Authenticator.protectHTTP(),
        this.friendController.getFriendRequests
      );

    this.router
      .route("/requests/:friendRequestId/accept")
      .post(
        Authenticator.protectHTTP(),
        Validator.validateParams(acceptFriendRequestParamsSchema),
        this.friendController.acceptFriendRequest
      );

    this.router
      .route("/requests/:friendRequestId/reject")
      .post(
        Authenticator.protectHTTP(),
        Validator.validateParams(rejectFriendRequestParamsSchema),
        this.friendController.rejectFriendRequest
      );
  }
}
