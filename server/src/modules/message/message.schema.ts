import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ default: false })
  read: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Dialog', index: true })
  dialogId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Group', index: true })
  groupId?: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
