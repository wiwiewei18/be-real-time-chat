export class ChatParticipant {
  constructor(
    public readonly chatId: string,
    public readonly userId: string,
    public id?: string
  ) {}
}
