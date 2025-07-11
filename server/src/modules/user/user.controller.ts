import {
  HttpStatus,
  Controller,
  HttpCode,
  Delete,
  Param,
  Patch,
  Get,
  Body,
} from '@nestjs/common';

import { User } from 'src/modules/user/user.schema';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Список пользователей' })
  async findAll() {
    return await this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя' })
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateById(id, updateUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  async removeById(@Param('id') id: string): Promise<void> {
    await this.userService.deleteById(id);
  }
}
