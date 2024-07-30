import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/mapped-types';
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
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
}
