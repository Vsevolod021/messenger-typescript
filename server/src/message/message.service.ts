import { Message, MessageDocument } from 'src/schemas/message.schema';
import { CreateMessageDto, EmitMessageDto } from './message.dto';
import { UsersService } from 'src/users/users.service';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    private usersService: UsersService,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const date = new Date();
    const newMessage = new this.messageModel({ ...createMessageDto, date });

    return await newMessage.save();
  }

  async createEmittedMessage(message: Message): Promise<EmitMessageDto> {
    const userId = message.userId;

    if (!isValidObjectId(userId)) {
      throw new Error('Невалидный userId');
    }

    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const { login, photo, surname, name } = user;
    const { _id, date, text } = message;

    return { _id, name, date, text, login, photo, surname };
  }

  async findAll() {
    return await this.messageModel.find();
  }
}
