import { Types } from 'mongoose';

export interface SignInDto {
  login: string;
  password: string;
}

export interface ProfileDto {
  _id: Types.ObjectId;
  surname: string;
  login: string;
  photo: string;
  name: string;
}
