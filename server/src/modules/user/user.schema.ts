import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  photo: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  secondName: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  contacts: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
