import { io, Socket } from 'socket.io-client';
import { reactive } from 'vue';

interface State {
  connected: boolean;
  messages: { id: string; message: string }[];
}

export const socketState = reactive<State>({
  connected: false,
  messages: []
});

let socket: Socket;

export function useSocket(url: string) {
  function connect() {
    socket = io(url);

    socket.on('connect', () => {
      socketState.connected = true;
    });

    socket.on('disconnect', () => {
      socketState.connected = false;
    });

    socket.on('message', (data: { id: string; message: string }) => {
      socketState.messages.push(data);
    });
  }

  function disconnect() {
    if (socket) {
      socket.disconnect();
    }
  }

  function sendMessage(message: string) {
    if (socket) {
      socket.emit('message', message);
    }
  }

  return {
    connect,
    disconnect,
    sendMessage,
    socketState
  };
}
