import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './users.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(login: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ login: login }).exec();

    if (!user) {
      return undefined;
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
}
