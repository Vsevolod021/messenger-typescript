export interface UserDto {
  userId: number;
  login: string;
  password: string;
}

export type UsersDto = Array<UserDto>;
