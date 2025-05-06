import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageModule } from 'src/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatGateway],
  imports: [
    MessageModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
})
export class ChatModule {}
