import { User, UserDocument } from 'src/modules/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findOne<Value>(field: string, value: Value): Promise<User | undefined> {
    const user = await this.userModel.findOne({ [field]: value }).exec();

    if (!user) {
      return undefined;
    }
    return user;
  }

  async findOneByLogin(login: string): Promise<User | undefined> {
    return await this.findOne('login', login);
  }

  async findOneById(_id: Types.ObjectId): Promise<User | undefined> {
    return await this.findOne('_id', _id);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
}
