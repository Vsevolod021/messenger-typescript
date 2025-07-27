import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface OnlineUser {
  socketId: string;
  userId: string;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');
  private onlineUsers: Map<string, string> = new Map();

  afterInit() {
    this.logger.log('✅ Socket initialized');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.onlineUsers.set(userId, client.id);
      this.server.emit('user:online', { userId });
      this.logger.log(`🟢 ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    const disconnectedUserId = [...this.onlineUsers.entries()].find(
      ([_, socketId]) => socketId === client.id,
    )?.[0];

    if (disconnectedUserId) {
      this.onlineUsers.delete(disconnectedUserId);
      this.server.emit('user:offline', { userId: disconnectedUserId });
      this.logger.log(`🔴 ${disconnectedUserId} disconnected`);
    }
  }

  // ====== СОБЫТИЯ ======

  // 1. Отправка нового сообщения всем участникам чата
  sendMessageToChat(payload: {
    chatType: 'dialog' | 'group';
    chatId: string;
    message: any;
  }) {
    const room = `${payload.chatType}:${payload.chatId}`;
    this.server.to(room).emit('message:new', payload.message);
    this.logger.log(`📨 message:new → ${room}`);
  }

  // 2. Уведомить пользователя, что его добавили в группу
  notifyGroupInvite(userId: string, group: any) {
    const socketId = this.onlineUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('group:invite', group);
      this.logger.log(`👥 group:invite → ${userId}`);
    }
  }

  // 3. Добавить пользователя в комнату
  async joinRoom(socket: Socket, chatType: 'dialog' | 'group', chatId: string) {
    const room = `${chatType}:${chatId}`;
    await socket.join(room);
    this.logger.log(`🟢 ${socket.id} joined ${room}`);
  }
}
