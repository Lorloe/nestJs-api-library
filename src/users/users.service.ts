import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;
    const hashPassword = this.getHashPassword(password);
    const user = await this.userModel.create({
      email,
      name,
      password: hashPassword,
    });
    console.log(user);
    return this.userModel.create(user);
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user;
  }

  async findOneByName(): Promise<{ name: string }[]> {
    return await this.userModel.find({}, 'name').exec();
  }

  async findOneByEmail(): Promise<{ email: string }[]> {
    return await this.userModel.find({}, 'email').exec();
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  // async updateUserById(id: string, updateUserDto: UpdateUserDto) {
  //   const { email, password, name } = updateUserDto;
  //   const hashPassword = this.getHashPassword(password);
  //   const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
  //     email,
  //     name,
  //     password: hashPassword,
  //     new: true,
  //   });
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   return user;
  // }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<{ deletedCount?: number }> {
    return await this.userModel.deleteMany({});
  }
}
