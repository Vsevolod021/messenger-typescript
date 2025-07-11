export interface CreateUserDto {
  login: string;
  password: string;
  name: string;
  secondName: string;
}

export interface UpdateUserDto {
  login?: string;
  password?: string;
  name?: string;
  secondName?: string;
  photo?: string;
  description?: string;
  contacts?: string;
}
