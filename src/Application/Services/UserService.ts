import { DataSource, Repository } from "typeorm";
import { User } from "../../Infrastructure/Database/Entities/User";

export interface UserCreateDTO {
  username: string;
  password: string;
  ownedShopIds: string[];
}

export class UserService {
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async register(registerObj: UserCreateDTO) {
    try {
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
}
