import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/mapped-types';
import { Role } from 'src/roles/roles.enum';
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {

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
  @IsEnum(Role, { each: true })
  @IsOptional()
  readonly roles?: Role[];
}
