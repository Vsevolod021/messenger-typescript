import { io } from 'socket.io-client';
import { socketUrl } from '@/config';

export const useSocket = <T>() => {
  const socket = io(socketUrl);

  const on = (event: string, callback: (data: T) => void) => {
    socket.on(event, callback);
  };

  const off = (event: string) => {
    socket.off(event);
  };

  const emit = (event: string, data: T) => {
    socket.emit(event, data);
  };

  return { socket, on, off, emit };
};
