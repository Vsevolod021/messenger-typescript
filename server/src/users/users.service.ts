import { UsersDto, UserDto, CreateUserDto } from './users.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly users: UsersDto = [
    {
      userId: 1,
      login: 'John',
      password: 'changeme',
    },
    {
      userId: 2,
      login: 'Maria',
      password: 'guess',
    },
  ];

  findOne(login: string): UserDto | undefined {
    return this.users.find((user) => user.login === login);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
