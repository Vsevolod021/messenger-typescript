import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  _id: Types.ObjectId;

  @Prop({ default: '' })
  date: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
