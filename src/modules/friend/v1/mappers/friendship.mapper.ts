import { Friendship, FriendshipStatus } from "../domains/friendship.domain";
import { FriendshipModelType } from "../models/friendship.model";

export class FriendshipMapper {
  public static toPersistence(
    friendship: Friendship
  ): Omit<FriendshipModelType, "id"> {
    return {
      requester_id: friendship.requesterId,
      receiver_id: friendship.receiverId,
      status: friendship.getStatus(),
    };
  }

  public static toDomain(friendshipModel: FriendshipModelType): Friendship {
    return new Friendship(
      friendshipModel.requester_id,
      friendshipModel.receiver_id,
      friendshipModel.status as FriendshipStatus
    );
  }
}
