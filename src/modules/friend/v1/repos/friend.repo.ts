import { Friendship } from "../domain/friendship.domain";

export interface FriendshipRepo {
  getFriendshipBetweenTwoUsers(
    user1Id: string,
    user2Id: string
  ): Promise<Friendship | null>;
}
