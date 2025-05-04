import {
  HttpException,
  HttpStatus,
  Controller,
  HttpCode,
  Param,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { isValidObjectId } from 'mongoose';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const responseBody = {
      status: HttpStatus.UNAUTHORIZED,
      error: 'Failed',
      message: 'Не найден',
    };

    if (!isValidObjectId(id)) {
      throw new HttpException(responseBody, HttpStatus.BAD_REQUEST);
    }

    const _id = new Types.ObjectId(id);

    const user = await this.usersService.findOneById(_id);

    if (!user) {
      throw new HttpException(responseBody, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
