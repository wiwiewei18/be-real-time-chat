import { Request, Response } from "express";
import { BaseController } from "../../../../shared/http/controllers/base.controller";
import { AsyncErrorHandler } from "../../../../shared/http/utils/AsyncErrorHandler";
import { FriendService } from "../services/friend.service";
import { sendFriendRequestInput } from "../validations/sendFriendRequest.validation";

export class FriendController extends BaseController {
  constructor(private friendService: FriendService) {
    super();
  }

  public sendFriendRequest = AsyncErrorHandler(
    async (req: Request, res: Response) => {
      const sendFriendRequestInput: sendFriendRequestInput = req.body;

      await this.friendService.sendFriendRequest(
        sendFriendRequestInput,
        (req as any).user.username
      );

      this.ok(res, "Friend request sent successfully");
    }
  );
}
