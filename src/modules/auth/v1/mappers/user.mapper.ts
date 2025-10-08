import { User } from "../domains/user.domain";
import { UserDTOType } from "../dtos/user.dto";
import { UserModelType } from "../models/user.model";

export class UserMapper {
  public static toPersistence(user: User): Omit<UserModelType, "id"> {
    return {
      name: user.name,
      username: user.username,
      password: user.password,
    };
  }

  public static toDomain(userModel: UserModelType): User {
    return new User(
      userModel.name,
      userModel.username,
      userModel.password,
      userModel.id
    );
  }

  public static toDTO(user: User): UserDTOType {
    return {
      id: user.id!,
      name: user.name,
      username: user.username,
    };
  }
}
