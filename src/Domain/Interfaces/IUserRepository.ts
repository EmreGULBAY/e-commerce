import {
  UserCreateDTO,
  UserLoginDTO,
} from "../DTOs/UserDTO";
import { User } from "../Entities/User";

export interface IUserRepository {
  findByUsername: (username: string) => Promise<User | null>;
  getAllUsers: () => Promise<User[]>;
  login: (credentials: UserLoginDTO) => Promise<string>;
  register: (user: UserCreateDTO) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUserPassword: (id: string, oldPassword: string, newPassword: string) => Promise<void>;
}
