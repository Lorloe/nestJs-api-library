import { User } from 'src/users/schemas/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload) {
    const { id } = payload;
    // check user Connect Or Not Connect
    const user = await this.userModel.findById(id);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid token. Must login first to access this endpoint',
      );
    }
    return user;
  }
}
