import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  photo: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  surname: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Contact' }] })
  contacts: Types.ObjectId;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Chat' }] })
  chats: Types.ObjectId;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Group' }] })
  groups: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
