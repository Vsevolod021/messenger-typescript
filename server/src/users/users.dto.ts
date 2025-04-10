export interface UserDto {
  userId: number;
  login: string;
  password: string;
}

export interface CreateUserDto {
  login: string;
  password: string;
  name: string;
}

export type UsersDto = Array<UserDto>;
