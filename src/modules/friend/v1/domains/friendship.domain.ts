import { User } from "../../../auth/v1/domains/user.domain";

export enum FriendshipStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export class Friendship {
  private requester?: User;
  private receiver?: User;

  constructor(
    public readonly requesterId: string,
    public readonly receiverId: string,
    private status: FriendshipStatus = FriendshipStatus.Pending,
    public id?: string
  ) {}

  public getStatus(): FriendshipStatus {
    return this.status;
  }

  public getRequester(): User | undefined {
    return this.requester;
  }

  public setRequester(requester: User): void {
    this.requester = requester;
  }

  public getReceiver(): User | undefined {
    return this.receiver;
  }

  public setReceiver(receiver: User): void {
    this.receiver = receiver;
  }

  public accept(): void {
    if (this.status !== FriendshipStatus.Pending) {
      throw new Error("Friendship cannot be accepted in current state");
    }

    this.status = FriendshipStatus.Accepted;
  }

  public reject(): void {
    if (this.status !== FriendshipStatus.Pending) {
      throw new Error("Friendship cannot be rejected in current state");
    }

    this.status = FriendshipStatus.Rejected;
  }
}
