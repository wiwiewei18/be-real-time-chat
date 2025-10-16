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

  public accept(): void {
    if (this.status !== "pending") {
      throw new Error("Friendship cannot be accepted in current state");
    }

    this.status = "accepted";
  }

  public reject(): void {
    if (this.status !== "pending") {
      throw new Error("Friendship cannot be rejected in current state");
    }

    this.status = "rejected";
  }
}
