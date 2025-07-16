export interface CreateGroupDto {
  name: string;
  users: string[];
  photo?: string;
  description?: string;
}

export interface UpdateGroupDto {
  name?: string;
  photo?: string;
  description?: string;
}

export interface UpdateUsersListDto {
  user: string;
}
