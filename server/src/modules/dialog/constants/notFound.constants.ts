import { NotFoundException, BadRequestException } from '@nestjs/common';

const DialogNotFoundException = new NotFoundException('Диалог не найден');

const DialogAlreadyExistsException = new BadRequestException(
  'Диалог между этими пользователями уже существует',
);

const UsersLengthException = new BadRequestException(
  'Диалог должен быть между двумя пользователями',
);

export {
  DialogNotFoundException,
  UsersLengthException,
  DialogAlreadyExistsException,
};
