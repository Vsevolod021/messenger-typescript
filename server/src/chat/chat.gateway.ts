import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  MessageBody,
} from '@nestjs/websockets';

import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/message.dto';
import { UsersService } from 'src/users/users.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  constructor(
    private messageService: MessageService,
    private usersService: UsersService,
  ) {}

  afterInit() {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: CreateMessageDto) {
    await this.messageService.create(message);

    const messagesList = await this.messageService.findAll();

    const emittedMessagePromises = messagesList.map(async (message) => {
      const userId = message.userId;

      const user = await this.usersService.findOneById(userId);

      if (!user) {
        throw new Error('Пользователь не найде');
      }

      const { login, photo, surname, name } = user;
      const { _id, date, text } = message;

      return { _id, name, date, text, login, photo, surname };
    });

    const emittedMessage = await Promise.all(emittedMessagePromises);

    this.server.emit('message', emittedMessage);
  }
}
