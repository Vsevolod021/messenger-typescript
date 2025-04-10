import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/messenger'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
