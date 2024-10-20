import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserCreateDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @IsPhoneNumber()
  phone!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName!: string;
}

export class UserLoginDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  password!: string;
}
