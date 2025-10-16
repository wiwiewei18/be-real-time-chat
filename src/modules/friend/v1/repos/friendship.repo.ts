import { Friendship } from "../domains/friendship.domain";

export interface FriendshipRepo {
  save(friendship: Friendship): Promise<void>;
  getFriendshipById(id: string): Promise<Friendship | null>;
  getFriendshipBetweenTwoUsers(
    user1Id: string,
    user2Id: string
  ): Promise<Friendship | null>;
}
