export interface UserDto {
  userId: number;
  username: string;
  password: string;
}

export type UsersDto = Array<UserDto>;
