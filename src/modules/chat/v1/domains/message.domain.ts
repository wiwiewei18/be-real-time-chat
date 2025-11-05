export class Message {
  constructor(
    public readonly chatId: string,
    public readonly senderId: string,
    public content: string,
    public createdAt?: Date,
    public id?: string
  ) {}
}
