import { User } from "../domains/user.domain";

export interface UserRepo {
  create(user: User): Promise<void>;
  getUserByUserId(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
}
