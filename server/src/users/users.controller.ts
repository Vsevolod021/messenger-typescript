import {
  HttpStatus,
  Controller,
  HttpCode,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }
}
