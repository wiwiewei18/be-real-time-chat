import { StatusCode } from "../../../../shared/http/constants/StatusCode";
import CustomError from "../../../../shared/http/utils/CustomError";
import { Hasher } from "../../../../shared/utils/hasher";
import { JWT } from "../../../../shared/utils/jwt";
import { User } from "../domains/user.domain";
import { UserDTOType } from "../dtos/user.dto";
import { UserMapper } from "../mappers/user.mapper";
import { UserRepo } from "../repos/user.repo";
import { SignInInput } from "../validations/signIn.validation";
import { SignUpInput } from "../validations/signUp.validation";

type SignInOutput = {
  token: string;
  user: UserDTOType;
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

    const user = new User(
      signUpInput.name,
      signUpInput.username,
      signUpInput.password
    );
    await user.hashPassword(Hasher.hash);

    await this.userRepo.create(user);
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

    return {
      token,
      user: UserMapper.toDTO(user),
    };
  };
}
