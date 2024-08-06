import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
