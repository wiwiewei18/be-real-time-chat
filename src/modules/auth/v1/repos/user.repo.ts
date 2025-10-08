import { User } from "../domains/user.domain";

export interface UserRepo {
  create(user: User): Promise<void>;
  getUserByUsername(username: string): Promise<User | null>;
}
