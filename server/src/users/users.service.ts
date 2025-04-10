import { CreateUserDto } from './users.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login: login }).exec();

    if (!user) {
      throw new NotFoundException(`User with login "${login}" not found`);
    }

    return user;
  }

  // async findAll(): Promise
}
