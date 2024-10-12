import { DataSource, Repository } from "typeorm";
import { User } from "../../Infrastructure/Database/Entities/User";
import { inject, injectable } from "tsyringe";
import { IsString, MinLength, MaxLength, IsArray } from "class-validator";
import { comparePassword } from "../../Helpers/AuthHelpers";
import { AuthService } from "./AuthService";

export class UserCreateDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password!: string;

  @IsArray()
  @IsString({ each: true })
  ownedShopIds!: string[];
}

export class UserLoginDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  password!: string;
}

@injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor(
    @inject("DataSource") private dataSource: DataSource,
    @inject(AuthService) private authService: AuthService
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async register(registerObj: UserCreateDTO) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { username: registerObj.username },
      });
      if (existingUser) {
        throw new Error("Username already taken");
      }
      const newUser = this.userRepository.create({
        ...registerObj,
        role: "user",
        isActive: true,
      });
      await this.userRepository.save(newUser);
    } catch (e) {
      throw e;
    }
  }

  async login(loginObj: UserLoginDTO) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: loginObj.username,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await comparePassword(
        user.password,
        loginObj.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = await this.authService.generateToken(user);
      return token;
    } catch (e) {
      throw e;
    }
  }
}
