import {
  HttpStatus,
  Controller,
  HttpCode,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserDto } from './users.dto';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }
}
