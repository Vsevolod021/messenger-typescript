import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DialogDocument = Dialog & Document;

@Schema({ timestamps: true })
export class Dialog {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
