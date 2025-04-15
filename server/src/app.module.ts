import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/messenger'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
