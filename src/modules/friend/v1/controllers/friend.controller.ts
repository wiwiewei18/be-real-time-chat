import { Request, Response } from "express";
import { BaseController } from "../../../../shared/http/controllers/base.controller";
import { AsyncErrorHandler } from "../../../../shared/http/utils/AsyncErrorHandler";
import { FriendService } from "../services/friend.service";
import { SendFriendRequestInput } from "../validations/sendFriendRequest.validation";
import { AcceptFriendRequestInput } from "../validations/acceptFriendRequest.validation";
import { RejectFriendRequestInput } from "../validations/rejectFriendRequest.validation";

export class FriendController extends BaseController {
  constructor(private friendService: FriendService) {
    super();
  }

  public sendFriendRequest = AsyncErrorHandler(
    async (req: Request, res: Response) => {
      const sendFriendRequestInput: SendFriendRequestInput = req.body;

      await this.friendService.sendFriendRequest(
        sendFriendRequestInput,
        (req as any).user.username
      );

      this.ok(res, "Friend request sent successfully");
    }
  );

  public getFriendRequests = AsyncErrorHandler(
    async (req: Request, res: Response) => {
      const getFriendRequestsOutput =
        await this.friendService.getFriendRequests((req as any).user.userId);

      this.ok(
        res,
        "Friend requests list fetched successfully",
        getFriendRequestsOutput
      );
    }
  );

  public acceptFriendRequest = AsyncErrorHandler(
    async (req: Request, res: Response) => {
      const acceptFriendRequestInput = req.params as AcceptFriendRequestInput;

      await this.friendService.acceptFriendRequest(acceptFriendRequestInput);

      this.ok(res, "Friend request accepted successfully");
    }
  );

  public rejectFriendRequest = AsyncErrorHandler(
    async (req: Request, res: Response) => {
      const rejectFriendRequestInput = req.params as RejectFriendRequestInput;

      await this.friendService.rejectFriendRequest(rejectFriendRequestInput);

      this.ok(res, "Friend request rejected successfully");
    }
  );
}
