import { ChatParticipant } from "./chatParticipant.domain";

export class Chat {
  private participants: ChatParticipant[] = [];

  constructor(public id?: string) {}

  public getParticipants(): ChatParticipant[] {
    return this.participants;
  }

  public addParticipant(participantModel: ChatParticipant): void {
    this.participants.push(participantModel);
  }
}
