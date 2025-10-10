export type FriendshipStatus = "pending" | "accepted" | "rejected";

export class Friendship {
  constructor(
    public readonly requesterId: string,
    public readonly receiverId: string,
    private status: FriendshipStatus = "pending"
  ) {}

  public getStatus(): FriendshipStatus {
    return this.status;
  }
}
