import { Message, MessageSchema } from 'src/modules/message/message.schema';
import { UserModule } from 'src/modules/user/user.module';
import { MessageController } from './message.controller';
import { DialogModule } from '../dialog/dialog.module';
import { GroupModule } from '../group/group.module';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GroupModule,
    DialogModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
