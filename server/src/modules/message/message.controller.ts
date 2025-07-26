import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateMessageDto, UpdateMessageDto } from './message.dto';
import { MessageService } from './message.service';
import { AuthService } from '../auth/auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @ApiOperation({ summary: 'Создать сообщение' })
  async createMessage(
    @Body() body: Omit<CreateMessageDto, 'author'>,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization.replace('Bearer ', '');

    const { _id } = await this.authService.getUserDataFromToken(token);

    const createMessageDto = { ...body, author: String(_id) };

    return this.messageService.createMessage(createMessageDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Получить все сообщения' })
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Получить сообщение по ID' })
  async getMessageById(@Param('id') id: string) {
    return this.messageService.getMessageById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('dialog/:dialogId')
  @ApiOperation({ summary: 'Получить сообщения диалога' })
  async getMessagesByDialogId(@Param('dialogId') dialogId: string) {
    return this.messageService.getMessagesByDialogId(dialogId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('group/:groupId')
  @ApiOperation({ summary: 'Получить сообщения группы' })
  async getMessagesByGroupId(@Param('groupId') groupId: string) {
    return this.messageService.getMessagesByGroupId(groupId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @ApiOperation({ summary: 'Редактировать сообщение' })
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.updateMessage(id, updateMessageDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить сообщение' })
  async deleteMessage(@Param('id') id: string) {
    return this.messageService.deleteMessage(id);
  }
}
