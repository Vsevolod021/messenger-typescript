import { io, Socket } from 'socket.io-client';
import { socketUrl } from '@/config';

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(socketUrl);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  on<On>(event: string, callback: (data: On) => void) {
    this.socket.on(event, callback);
  }

  off(event: string) {
    this.socket.off(event);
  }

  emit<Emit>(event: string, data: Emit) {
    this.socket.emit(event, data);
  }
}

export default new SocketService();
