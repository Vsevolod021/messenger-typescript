import { io } from 'socket.io-client';
import { socketUrl } from '@/config';

export const useSocket = <Emit, On>() => {
  const socket = io(socketUrl);

  const on = (event: string, callback: (data: On) => void) => {
    socket.on(event, callback);
  };

  const off = (event: string) => {
    socket.off(event);
  };

  const emit = (event: string, data: Emit) => {
    socket.emit(event, data);
  };

  return { socket, on, off, emit };
};
