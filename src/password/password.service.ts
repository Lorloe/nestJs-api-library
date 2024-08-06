import { User } from 'src/users/schemas/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
    private configService: ConfigService,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async checkPasswordsMatch(
    hashedPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(newPassword, hashedPassword);
  }

  async updatePasswordById(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    //Tìm người dùng theo Id
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(user);
    //Kiểm tra mật khẩu cũ
    const isPasswordMatching = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordMatching) {
      throw new HttpException(
        `Old password is not correct`,
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(isPasswordMatching);
    // Kiểm tra nếu mật khẩu mới giống mật khẩu cũ
    const isNewPasswordSameAsOld = await this.checkPasswordsMatch(
      user.password,
      newPassword,
    );
    if (isNewPasswordSameAsOld) {
      throw new HttpException(
        'New password cannot be the same as the current password',
        HttpStatus.BAD_REQUEST,
      );
    }
    //Hash mật khẩu và cập nhật mật khẩu mới
    user.password = this.getHashPassword(newPassword);
    await user.save();
    return { message: 'Password Updated Successfully' };
  }
}
