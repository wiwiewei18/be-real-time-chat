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

  public async comparePassword(
    password: string,
    compareFn: (password: string, hashed: string) => Promise<boolean>
  ): Promise<boolean> {
    return compareFn(password, this.password);
  }
}
