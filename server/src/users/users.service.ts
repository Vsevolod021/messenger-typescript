import { Injectable } from '@nestjs/common';
import { UsersDto, UserDto } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users: UsersDto = [
    {
      userId: 1,
      username: 'John',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'Maria',
      password: 'guess',
    },
  ];

  findOne(username: string): UserDto | undefined {
    return this.users.find((user) => user.username === username);
  }
}
