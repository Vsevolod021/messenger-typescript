import { NotFoundException } from '@nestjs/common';

const InvalidIdException = new NotFoundException('Неверный идентификатор');

export { InvalidIdException };
