import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { MessageModule } from 'src/message/message.module';
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
