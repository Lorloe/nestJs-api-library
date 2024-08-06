import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login-as')
  async loginAs(@Request() req, @Body() body: any) {
    const rootUser = req.user;
    const subUser = await this.usersService.findOneById(body.name);
    if (!subUser || subUser.parent.toString() !== rootUser.userId) {
      return { message: 'Invalid user' };
    }
    return this.authService.login(subUser);
  }
}
