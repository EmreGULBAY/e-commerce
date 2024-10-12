import { DataSource, Repository } from "typeorm";
import { User } from "../../Infrastructure/Database/Entities/User";
import { inject, injectable } from "tsyringe";
import { IsString, MinLength, MaxLength, IsArray } from "class-validator";

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

@injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor(@inject("DataSource") private dataSource: DataSource) {
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
