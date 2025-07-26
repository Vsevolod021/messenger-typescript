import {
  AuthorNotInDialogException,
  InvalidChatGroupException,
  MissingChatGroupException,
  MessageNotFoundException,
} from './constants/notFound.constants';

import { CreateMessageDto, UpdateMessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';
import { DialogService } from '../dialog/dialog.service';
import { GroupService } from '../group/group.service';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private dialogService: DialogService,
    private groupService: GroupService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const { dialogId, groupId, author } = createMessageDto;

    if (dialogId && groupId) {
      throw InvalidChatGroupException;
    }

    if (!dialogId && !groupId) {
      throw MissingChatGroupException;
    }

    if (dialogId) {
      const { users } = await this.dialogService.getDialogById(dialogId);

      if (!users.find((u) => String(u) !== author)) {
        throw AuthorNotInDialogException;
      }
    }

    if (groupId) {
      const { users } = await this.groupService.getGroupById(groupId);

      if (!users.find((u) => String(u) !== author)) {
        throw AuthorNotInDialogException;
      }
    }

    const newMessage = new this.messageModel(createMessageDto);
    return await newMessage.save();
  }

  async getAllMessages() {
    return await this.messageModel.find().exec();
  }

  async getMessageById(_id: string) {
    if (!isValidObjectId(_id)) {
      throw MessageNotFoundException;
    }

    const message = await this.messageModel.findById(_id).exec();

    if (!message) {
      throw MessageNotFoundException;
    }

    return message;
  }

  async getMessagesByDialogId(dialogId: string) {
    if (!isValidObjectId(dialogId)) {
      throw MessageNotFoundException;
    }

    await this.dialogService.getDialogById(dialogId);

    const messages = await this.messageModel.find({ dialogId }).exec();

    if (!messages) {
      throw MessageNotFoundException;
    }

    return messages;
  }

  async getMessagesByGroupId(groupId: string) {
    if (!isValidObjectId(groupId)) {
      throw MessageNotFoundException;
    }

    await this.groupService.getGroupById(groupId);

    const messages = await this.messageModel.find({ groupId }).exec();

    if (!messages) {
      throw MessageNotFoundException;
    }

    return messages;
  }

  async updateMessage(_id: string, updateMessageDto: UpdateMessageDto) {
    if (!isValidObjectId(_id)) {
      throw MessageNotFoundException;
    }

    const updated = await this.messageModel.findByIdAndUpdate(
      _id,
      { $set: updateMessageDto },
      { new: true },
    );

    if (!updated) {
      throw MessageNotFoundException;
    }

    return updated;
  }

  async deleteMessage(_id: string) {
    if (!isValidObjectId(_id)) {
      throw MessageNotFoundException;
    }

    const deleted = await this.messageModel.findByIdAndDelete(_id);

    if (!deleted) {
      throw MessageNotFoundException;
    }

    return deleted;
  }
}
