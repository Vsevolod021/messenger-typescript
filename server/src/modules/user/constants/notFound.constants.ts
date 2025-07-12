import { NotFoundException } from '@nestjs/common';

const userNotFoundException = new NotFoundException('Пользователь не найден');

export { userNotFoundException };
