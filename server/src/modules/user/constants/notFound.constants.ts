import { NotFoundException } from '@nestjs/common';

const userNotFoundException = new NotFoundException('Пользователь не найден');
const invalidIdException = new NotFoundException('Неверный идентификатор');

export { userNotFoundException, invalidIdException };
