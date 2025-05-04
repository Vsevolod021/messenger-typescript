import { Types } from 'mongoose';

export interface CreateMessageDto {
  text: string;
  userId: Types.ObjectId;
}

export interface EmitMessageDto {
  _id: string;
  date: Date;
  text: string;
  name: string;
  login: string;
  photo: string;
  surname: string;
}
