import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  MessageBody,
} from '@nestjs/websockets';

import { MessageService } from 'src/modules/message/message.service';
import { CreateMessageDto } from 'src/modules/message/message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  constructor(private messageService: MessageService) {}

  afterInit() {
    this.logger.log('Initialized!');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    const messagesList = await this.messageService.findAll();

    const emittedMessagePromises = messagesList.map(async (message) => {
      return await this.messageService.createEmittedMessage(message);
    });

    const emittedMessage = await Promise.all(emittedMessagePromises);

    this.server.emit('message', emittedMessage);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: CreateMessageDto) {
    const savedMessage = await this.messageService.create(message);

    const emittedMessage =
      await this.messageService.createEmittedMessage(savedMessage);

    this.server.emit('message', [emittedMessage]);
  }
}
