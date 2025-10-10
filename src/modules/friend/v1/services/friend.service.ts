import { StatusCode } from "../../../../shared/http/constants/StatusCode";
import CustomError from "../../../../shared/http/utils/CustomError";
import { UserRepo } from "../../../auth/v1/repos/user.repo";
import { Friendship } from "../domains/friendship.domain";
import { FriendshipRepo } from "../repos/friend.repo";
import { sendFriendRequestInput } from "../validations/sendFriendRequest.validation";

export class FriendService {
  constructor(
    private userRepo: UserRepo,
    private friendshipRepo: FriendshipRepo
  ) {}

  public sendFriendRequest = async (
    sendFriendRequestInput: sendFriendRequestInput,
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

    await this.friendshipRepo.create(friendship);
  };
}
