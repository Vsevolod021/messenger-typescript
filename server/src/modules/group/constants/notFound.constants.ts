import { NotFoundException, BadRequestException } from '@nestjs/common';

const GroupNotFoundException = new NotFoundException('Группа не найдена');

const UsersLengthException = new BadRequestException(
  'Группа должна содержать минимум одного пользователя',
);

const EmptyNameException = new BadRequestException(
  'Название группы не может быть пустым',
);

const UserNotExistsInGroup = new BadRequestException(
  'Пользователь не состоит в группе',
);

const UserExistsInGroup = new BadRequestException(
  'Пользователь уже состоит в группе',
);

export {
  GroupNotFoundException,
  UserNotExistsInGroup,
  UsersLengthException,
  EmptyNameException,
  UserExistsInGroup,
};
