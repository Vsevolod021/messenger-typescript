import { Injectable } from '@nestjs/common';
import { UsersDto, UserDto } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users: UsersDto = [
    {
      userId: 1,
      login: 'John',
      password: 'changeme',
    },
    {
      userId: 2,
      login: 'Maria',
      password: 'guess',
    },
  ];

  findOne(login: string): UserDto | undefined {
    return this.users.find((user) => user.login === login);
  }
}
