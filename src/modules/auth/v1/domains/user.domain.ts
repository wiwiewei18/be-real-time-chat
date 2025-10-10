export class User {
  constructor(
    public name: string,
    public username: string,
    public password: string,
    public id?: string
  ) {}

  public async hashPassword(
    hashingFn: (password: string) => Promise<string>
  ): Promise<void> {
    this.password = await hashingFn(this.password);
  }
}
