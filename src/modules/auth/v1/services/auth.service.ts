import { StatusCode } from "../../../../shared/http/constants/StatusCode";
import CustomError from "../../../../shared/http/utils/CustomError";
import { Hasher } from "../../../../shared/utils/hasher";
import { JWT } from "../../../../shared/utils/jwt";
import { UserRepo } from "../repos/user.repo";
import { UserSchemaType } from "../schemas/user.schema";
import { SignInInput } from "../validations/signIn.validation";
import { SignUpInput } from "../validations/signUp.validation";

type SignInOutput = {
  token: string;
  user: Omit<UserSchemaType, "password">;
};

export class AuthService {
  constructor(private userRepo: UserRepo) {}

  public signUp = async (signUpInput: SignUpInput): Promise<void> => {
    const existingUser = await this.userRepo.getUserByUsername(
      signUpInput.username
    );
    if (existingUser) {
      throw new CustomError(StatusCode.BAD_REQUEST, "Username already exists");
    }

    const hashedPassword = await Hasher.hash(signUpInput.password);
    signUpInput.password = hashedPassword;

    await this.userRepo.create(signUpInput);
  };

  public signIn = async (signInInput: SignInInput): Promise<SignInOutput> => {
    const user = await this.userRepo.getUserByUsername(signInInput.username);
    if (!user) {
      throw new CustomError(StatusCode.UNAUTHORIZED, "Invalid credentials");
    }

    const isPasswordValid = await Hasher.compare(
      signInInput.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new CustomError(StatusCode.UNAUTHORIZED, "Invalid credentials");
    }

    const token = JWT.sign({ userId: user.id, username: user.username });

    const { password, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  };
}
