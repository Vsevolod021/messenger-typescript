import { MessageModule } from 'src/modules/message/message.module';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatGateway],
  imports: [MessageModule],
})
export class ChatModule {}
