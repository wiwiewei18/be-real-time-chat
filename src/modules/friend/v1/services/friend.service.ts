import { StatusCode } from "../../../../shared/http/constants/StatusCode";
import CustomError from "../../../../shared/http/utils/CustomError";
import { UserRepo } from "../../../auth/v1/repos/user.repo";
import { Friendship } from "../domains/friendship.domain";
import { FriendshipRepo } from "../repos/friendship.repo";
import { AcceptFriendRequestInput } from "../validations/acceptFriendRequest.validation";
import { RejectFriendRequestInput } from "../validations/rejectFriendRequest.validation";
import { SendFriendRequestInput } from "../validations/sendFriendRequest.validation";

export class FriendService {
  constructor(
    private userRepo: UserRepo,
    private friendshipRepo: FriendshipRepo
  ) {}

  public sendFriendRequest = async (
    sendFriendRequestInput: SendFriendRequestInput,
    username: string
  ): Promise<void> => {
    const requester = await this.userRepo.getUserByUsername(username);
    const receiver = await this.userRepo.getUserByUsername(
      sendFriendRequestInput.receiverUsername
    );

    if (!requester || !receiver) {
      throw new CustomError(StatusCode.NOT_FOUND, "User not found");
    }

    if (requester.id === receiver.id) {
      throw new CustomError(
        StatusCode.BAD_REQUEST,
        "Cannot send friend request to yourself"
      );
    }

    const existingFriendship =
      await this.friendshipRepo.getFriendshipBetweenTwoUsers(
        requester.id!,
        receiver.id!
      );

    if (existingFriendship && existingFriendship.getStatus() === "pending") {
      throw new CustomError(
        StatusCode.BAD_REQUEST,
        "Friend request already sent"
      );
    }

    if (existingFriendship && existingFriendship.getStatus() === "accepted") {
      throw new CustomError(StatusCode.BAD_REQUEST, "Already friends");
    }

    const friendship = new Friendship(requester.id!, receiver.id!);

    await this.friendshipRepo.save(friendship);
  };

  public acceptFriendRequest = async (
    acceptFriendRequestInput: AcceptFriendRequestInput
  ): Promise<void> => {
    const friendship = await this.friendshipRepo.getFriendshipById(
      acceptFriendRequestInput.friendRequestId
    );
    if (!friendship) {
      throw new CustomError(StatusCode.NOT_FOUND, "Friend request not found");
    }

    if (friendship.getStatus() !== "pending") {
      throw new CustomError(
        StatusCode.BAD_REQUEST,
        "Friendship cannot be accepted in current state"
      );
    }

    friendship.accept();

    await this.friendshipRepo.save(friendship);
  };

  public rejectFriendRequest = async (
    rejectFriendRequestInput: RejectFriendRequestInput
  ): Promise<void> => {
    const friendship = await this.friendshipRepo.getFriendshipById(
      rejectFriendRequestInput.friendRequestId
    );
    if (!friendship) {
      throw new CustomError(StatusCode.NOT_FOUND, "Friend request not found");
    }

    if (friendship.getStatus() !== "pending") {
      throw new CustomError(
        StatusCode.BAD_REQUEST,
        "Friendship cannot be rejected in current state"
      );
    }

    friendship.reject();

    await this.friendshipRepo.save(friendship);
  };
}
