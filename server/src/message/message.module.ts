import { Message, MessageSchema } from 'src/schemas/message.schema';
import { UsersModule } from 'src/users/users.module';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
