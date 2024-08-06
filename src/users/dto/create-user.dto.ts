import { Role } from 'src/roles/roles.enum';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @IsEnum(Role, { each: true })
  readonly roles?: Role[];
}
