import {
  HttpStatus,
  Controller,
  HttpCode,
  Delete,
  Param,
  Patch,
  Body,
  Get,
  Post,
} from '@nestjs/common';

import {
  UpdateUsersListDto,
  UpdateGroupDto,
  CreateGroupDto,
} from './group.dto';

import { ApiOperation } from '@nestjs/swagger';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Список всех групп' })
  getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @ApiOperation({ summary: 'Создать группу' })
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Получить группу по ID' })
  getGroup(@Param('id') id: string) {
    return this.groupService.getGroupById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Получить все группы пользователя' })
  getGroupsByUser(@Param('userId') userId: string) {
    return this.groupService.getGroupsByUserId(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить группу' })
  deleteGroup(@Param('id') id: string) {
    return this.groupService.deleteGroup(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @ApiOperation({ summary: 'Редактировать группу' })
  updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/addUsers')
  @ApiOperation({ summary: 'Редактировать группу' })
  addUsers(@Param('id') id: string, @Body() user: UpdateUsersListDto) {
    return this.groupService.addUser(id, user.user);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/removeUsers')
  @ApiOperation({ summary: 'Редактировать группу' })
  removeUsers(@Param('id') id: string, @Body() user: UpdateUsersListDto) {
    return this.groupService.removeUser(id, user.user);
  }
}
