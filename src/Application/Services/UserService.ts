import { DataSource, Repository } from "typeorm";
import { User } from "../../Domain/Entities/User";
import { inject, injectable } from "tsyringe";
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  validate,
} from "class-validator";
import { comparePassword } from "../../Helpers/AuthHelpers";
import { AuthService } from "./AuthService";
import { IUserRepository } from "../../Domain/Interfaces/IUserRepository";
import { UserCreateDTO, UserLoginDTO } from "../../Domain/DTOs/UserDTO";

@injectable()
export class UserService implements IUserRepository {
  private userRepository: Repository<User>;

  constructor(
    @inject("DataSource") private dataSource: DataSource,
    @inject(AuthService) private authService: AuthService
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async register(registerObj: UserCreateDTO) {
    try {
      validate(registerObj).then((errors) => {
        if (errors.length > 0) throw new Error("Invalid Credentials");
      });
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

  async login(loginObj: UserLoginDTO): Promise<string> {
    try {
      validate(loginObj).then((errors) => {
        if (errors.length > 0) throw new Error("Invalid Credentials");
      });
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

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      throw e;
    }
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new Error("User not found");
      const isPasswordValid = await comparePassword(user.password, oldPassword);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      user.password = newPassword;
      await this.userRepository.save(user);
    } catch (e) {
      throw e;
    }
  }
}
