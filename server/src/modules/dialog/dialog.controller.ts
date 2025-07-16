import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dialog.dto';

@Controller('dialogs')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Список всех диалогов' })
  getAllDialogs() {
    return this.dialogService.getAllDialogs();
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @ApiOperation({ summary: 'Создать диалог' })
  createDialog(@Body() createDialogDto: CreateDialogDto) {
    return this.dialogService.createDialog(createDialogDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Получить диалог по ID' })
  getDialog(@Param('id') id: string) {
    return this.dialogService.getDialogById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Получить все диалоги пользователя' })
  getDialogsByUser(@Param('userId') userId: string) {
    return this.dialogService.getDialogsByUserId(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить диалог' })
  deleteDialog(@Param('id') id: string) {
    return this.dialogService.deleteDialog(id);
  }
}
