import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  photo: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }], default: [] })
  messages: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
