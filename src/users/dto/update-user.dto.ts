import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from 'src/roles/roles.enum';
export class UpdateUserDto {

  @IsString()
  @MaxLength(100)
  @IsOptional()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly name: string;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(8)
  // readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true, message: 'Invalid role' })
  @IsOptional()
  roles?: Role[];
}
