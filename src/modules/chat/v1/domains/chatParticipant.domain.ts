import { User } from "../../../auth/v1/domains/user.domain";

export class ChatParticipant {
  private user?: User;

  constructor(
    public readonly chatId: string,
    public readonly userId: string,
    public id?: string
  ) {}

  public getUser(): User | undefined {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }
}
