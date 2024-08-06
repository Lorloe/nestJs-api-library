import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Roles } from 'src/decorate/roles.decorate';
import { Role } from 'src/roles/roles.enum';

@Controller('users')
//@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  //@UseGuards(AuthGuard('jwt'))
  //@Roles(Role.SuperAdmin, Role.RootAdmin, Role.Admin)
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUser);
  }
  @Get('/findAll')
  async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  @Get('/findName')
  async findName(@Query() query: ExpressQuery): Promise<User[]> {
    return await this.usersService.findName(query);
  }

  @Get('/findById/:id')
  async findOneById(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.findOneById(id);
  }

  // @Get('/findByName/:name')
  // async findOneByName() {
  //   return await this.usersService.findOneByName();
  // }

  @Get('/findEmail')
  async findEmail(@Query() query: ExpressQuery): Promise<User[]> {
    return await this.usersService.findEmail(query);
  }

  // @Get('/findByEmail/:email')
  // async findOneByEmail() {
  //   return await this.usersService.findOneByEmail();
  // }

  @Put('/updateUser/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    const updateUser = await this.usersService.updateUserById(id, user);
    return {
      message: 'User Updated Successfully',
      user: updateUser,
    };
  }

  @Delete('deleteUser/:id')
  async deleteUserById(
    @Param('id') id: string,
  ): Promise<{ message: string; user: User }> {
    const deleteUser = await this.usersService.deleteUserById(id);
    return {
      message: 'User deleted successfully',
      user: deleteUser,
    };
  }

  @Delete('deleteAll')
  async deleteAll(): Promise<{ message: string }> {
    const deleteAllBook = await this.usersService.deleteAll();
    return {
      message: 'All Book delete successfully',
    };
  }
}
