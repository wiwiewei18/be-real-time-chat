import { Friendship } from "../domains/friendship.domain";

export interface FriendshipRepo {
  create(friendship: Friendship): Promise<void>;
  getFriendshipBetweenTwoUsers(
    user1Id: string,
    user2Id: string
  ): Promise<Friendship | null>;
}
