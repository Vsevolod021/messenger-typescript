import { BadRequestException, NotFoundException } from '@nestjs/common';

const MessageNotFoundException = new NotFoundException('Сообщение не найдено');

const InvalidIdException = new BadRequestException('Невалидный ID');

const InvalidChatGroupException = new BadRequestException(
  'Сообщение не может быть привязано и к группе, и к диалогу одновременно',
);

const MissingChatGroupException = new BadRequestException(
  'Сообщение должно быть привязано либо к чату, либо к группе',
);

const AuthorNotInDialogException = new BadRequestException(
  'Пользователь не состоит в данном диалоге',
);

export {
  AuthorNotInDialogException,
  MissingChatGroupException,
  InvalidChatGroupException,
  MessageNotFoundException,
  InvalidIdException,
};
