import { Types } from 'mongoose';

export interface CreateMessageDto {
  text: string;
  userId: Types.ObjectId;
}

export interface EmitMessageDto {
  _id: Types.ObjectId;
  secondName: string;
  createdAt?: Date;
  text: string;
  name: string;
  login: string;
  photo: string;
}
