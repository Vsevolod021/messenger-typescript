import { InvalidIdException } from 'src/shared/constants/notFound.constants';
import { userNotFoundException } from './constants/notFound.constants';
import { User, UserDocument } from 'src/modules/user/user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(field: string, value: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ [field]: value }).exec();

    if (!user) {
      return undefined;
    }
    return user;
  }

  async findOneByLogin(login: string): Promise<User | undefined> {
    return await this.findOne('login', login);
  }

  async findOneById(_id: string): Promise<User> {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const user = await this.userModel.findById(_id).exec();

    if (!user) {
      throw userNotFoundException;
    }

    return user;
  }

  async updateById(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      _id,
      { $set: updateUserDto },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw userNotFoundException;
    }

    return updatedUser;
  }

  async deleteById(_id: string): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const updatedUser = await this.userModel.findByIdAndDelete(_id);

    if (!updatedUser) {
      throw userNotFoundException;
    }
  }
}
