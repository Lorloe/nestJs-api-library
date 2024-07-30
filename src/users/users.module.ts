import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
