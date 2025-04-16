import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  photo: string;

  @Prop({ required: true })
  data: string;

  @Prop({ required: true, type: Types.ObjectId })
  contacts: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
