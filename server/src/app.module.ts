import { MessageModule } from './modules/message/message.module';
import { DialogModule } from './modules/dialog/dialog.module';
import { GroupModule } from './modules/group/group.module';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    UserModule,
    GroupModule,
    DialogModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://localhost/messenger'),
  ],
})
export class AppModule {}
