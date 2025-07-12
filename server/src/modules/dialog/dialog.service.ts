import {
  DialogNotFoundException,
  UsersLengthException,
  DialogAlreadyExistsException,
} from './constants/notFound.constants';

import { InvalidIdException } from 'src/shared/constants/notFound.constants';
import { Dialog, DialogDocument } from './dialog.schema';
import { UserService } from '../user/user.service';
import { Model, isValidObjectId } from 'mongoose';
import { CreateDialogDto } from './dialog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>,
    private userService: UserService,
  ) {}

  async getAllDialogs(): Promise<Dialog[]> {
    return await this.dialogModel.find().exec();
  }

  async createDialog({ users }: CreateDialogDto): Promise<Dialog> {
    if (users.length !== 2) {
      throw UsersLengthException;
    }

    for (const userId of users) {
      if (!isValidObjectId(userId)) {
        throw InvalidIdException;
      }
      await this.userService.findOneById(userId);
    }

    const dialog = await this.dialogModel.findOne({
      users: { $all: users, $size: 2 },
    });

    if (dialog) {
      throw DialogAlreadyExistsException;
    }

    const newDialog = new this.dialogModel({ users });
    return await newDialog.save();
  }

  async getDialogById(_id: string): Promise<Dialog> {
    if (!isValidObjectId(_id)) {
      throw InvalidIdException;
    }

    const dialog = await this.dialogModel.findById(_id).exec();

    if (!dialog) {
      throw DialogNotFoundException;
    }

    return dialog;
  }

  async getDialogsByUserId(userId: string): Promise<Dialog[]> {
    if (!isValidObjectId(userId)) {
      throw InvalidIdException;
    }

    await this.userService.findOneById(userId);

    return await this.dialogModel.find({ users: userId }).exec();
  }

  async deleteDialog(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw InvalidIdException;
    }

    const result = await this.dialogModel.findByIdAndDelete(id);

    if (!result) {
      throw DialogNotFoundException;
    }
  }
}
