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

import { Public } from 'src/modules/auth/decorators/public.decorator';
import { User } from 'src/modules/user/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { isValidObjectId } from 'mongoose';
import { Types } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
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

    const user = await this.userService.findOneById(_id);

    if (!user) {
      throw new HttpException(responseBody, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
