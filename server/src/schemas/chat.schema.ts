import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }], default: [] })
  messages: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
