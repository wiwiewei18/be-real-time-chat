export interface ChatRepo {
  save(): Promise<string>;
}
