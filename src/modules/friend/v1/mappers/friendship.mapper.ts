import { User } from "../../../auth/v1/domains/user.domain";
import { UserMapper } from "../../../auth/v1/mappers/user.mapper";
import { UserModelType } from "../../../auth/v1/models/user.model";
import { Friendship, FriendshipStatus } from "../domains/friendship.domain";
import { FriendshipDTOType } from "../dtos/friendship.dto";
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

  public static toDomain(
    friendshipModel: FriendshipModelType,
    requesterModel?: UserModelType,
    receiverModel?: UserModelType
  ): Friendship {
    const friendship = new Friendship(
      friendshipModel.requester_id,
      friendshipModel.receiver_id,
      friendshipModel.status as FriendshipStatus,
      friendshipModel.id
    );

    if (requesterModel) {
      friendship.setRequester(UserMapper.toDomain(requesterModel));
    }

    if (receiverModel) {
      friendship.setReceiver(UserMapper.toDomain(receiverModel));
    }

    return friendship;
  }

  public static toDTO(
    friendship: Friendship,
    requester?: User,
    receiver?: User
  ): FriendshipDTOType {
    return {
      id: friendship.id!,
      requester: requester ? UserMapper.toDTO(requester) : undefined,
      receiver: receiver ? UserMapper.toDTO(receiver) : undefined,
      status: friendship.getStatus(),
    };
  }
}
