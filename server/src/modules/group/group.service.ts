import {
  GroupNotFoundException,
  UserNotExistsInGroup,
  UsersLengthException,
  EmptyNameException,
  UserExistsInGroup,
} from './constants/notFound.constants';

import { InvalidIdException } from 'src/shared/constants/notFound.constants';
import { Group, GroupDocument } from './group.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGroupDto } from './group.dto';
import { UpdateGroupDto } from './group.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(
    private userService: UserService,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async getAllGroups() {
    return await this.groupModel.find().exec();
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const { users, name } = createGroupDto;

    if (users?.length === 0) {
      throw UsersLengthException;
    }

    if (name === '') {
      return EmptyNameException;
    }

    for (const userId of users) {
      if (!isValidObjectId(userId)) {
        throw InvalidIdException;
      }
      await this.userService.findOneById(userId);
    }

    const newGroup = new this.groupModel(createGroupDto);
    return await newGroup.save();
  }

  async getGroupById(_id: string) {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const group = await this.groupModel.findById(_id).exec();

    if (!group) {
      throw GroupNotFoundException;
    }

    return group;
  }

  async getGroupsByUserId(userId: string) {
    if (!isValidObjectId(userId)) {
      throw InvalidIdException;
    }

    await this.userService.findOneById(userId);

    return await this.groupModel.find({ users: userId }).exec();
  }

  async deleteGroup(_id: string) {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const result = await this.groupModel.findByIdAndDelete(_id);

    if (!result) {
      throw GroupNotFoundException;
    }
  }

  async updateGroup(_id: string, updateGroupDto: UpdateGroupDto) {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const { name } = updateGroupDto;

    if (name && name === '') {
      return EmptyNameException;
    }

    const updated = await this.groupModel.findByIdAndUpdate(
      _id,
      { $set: updateGroupDto },
      { new: true },
    );

    if (!updated) {
      throw GroupNotFoundException;
    }

    return updated;
  }

  async addUser(_id: string, userId: string) {
    await this.userService.findOneById(userId);

    const group = await this.getGroupById(_id);

    if (group.users.find((user) => userId === String(user))) {
      throw UserExistsInGroup;
    }

    const updated = await this.groupModel.findByIdAndUpdate(
      _id,
      { $push: { users: userId } },
      { new: true },
    );

    if (!updated) {
      throw GroupNotFoundException;
    }

    return updated;
  }

  async removeUser(_id: string, userId: string) {
    await this.userService.findOneById(userId);

    const group = await this.getGroupById(_id);

    if (group.users.every((user) => userId !== String(user))) {
      throw UserNotExistsInGroup;
    }

    const updated = await this.groupModel.findByIdAndUpdate(
      _id,
      { $pull: { users: userId } },
      { new: true },
    );

    if (!updated) {
      throw GroupNotFoundException;
    }

    return updated;
  }
}
