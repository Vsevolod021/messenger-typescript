export interface CreateMessageDto {
  text: string;
  dialogId?: string;
  groupId?: string;
  author: string;
}

export interface UpdateMessageDto {
  text: string;
  author: string;
}

export interface DeleteMessageDto {
  id: string;
  author: string;
}
