import { Message, MessageSchema } from 'src/modules/message/message.schema';
import { UserModule } from 'src/modules/user/user.module';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
