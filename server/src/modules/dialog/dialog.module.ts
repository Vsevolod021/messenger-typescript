import { Dialog, DialogSchema } from 'src/modules/dialog/dialog.schema';
import { DialogController } from './dialog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogService } from './dialog.service';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dialog.name, schema: DialogSchema }]),
    UserModule,
  ],
  controllers: [DialogController],
  providers: [DialogService],
  exports: [DialogService],
})
export class DialogModule {}
