import { MessageModule } from 'src/modules/message/message.module';
import { Chat, ChatSchema } from 'src/modules/chat/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatGateway],
  imports: [
    MessageModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
})
export class ChatModule {}
