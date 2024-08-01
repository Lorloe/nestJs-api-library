import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from 'src/users/schemas/user.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Pls enter correct Category' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass id user' })
  readonly user: User;

  @IsEmpty({ message: 'You cannot pass updatedBy ID' })
  readonly updatedBy: User;
}
