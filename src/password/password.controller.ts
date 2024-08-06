import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}
  @Patch('updatePassword/:id')
  @UseGuards(AuthGuard('jwt'))
  async updatePasswordById(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.passwordService.updatePasswordById(id, updatePasswordDto);
  }
}
