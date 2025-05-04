import { Message, MessageDocument } from 'src/schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './message.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const date = new Date();
    const newMessage = new this.messageModel({ ...createMessageDto, date });

    return await newMessage.save();
  }

  async findAll() {
    return await this.messageModel.find();
  }
}
