import { IsArray, IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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
