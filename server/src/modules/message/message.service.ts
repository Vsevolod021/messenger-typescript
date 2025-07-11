import { Message, MessageDocument } from 'src/modules/message/message.schema';
import { CreateMessageDto, EmitMessageDto } from './message.dto';
import { UserService } from 'src/modules/user/user.service';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    private userService: UserService,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const date = new Date();
    const newMessage = new this.messageModel({ ...createMessageDto, date });

    return await newMessage.save();
  }

  async createEmittedMessage(message: Message): Promise<EmitMessageDto> {
    const userId = String(message.author);

    if (!isValidObjectId(userId)) {
      throw new Error('Невалидный userId');
    }

    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const { login, photo, secondName, name } = user;
    const { _id, text, createdAt } = message;

    return { _id, name, text, login, photo, secondName, createdAt };
  }

  async findAll() {
    return await this.messageModel.find();
  }
}
