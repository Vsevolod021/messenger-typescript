<template>
  <div class="main">
    <h1>Вы авторизованы!</h1>
    <button @click="logOut">Выйти</button>

    <div class="main__chat">
      <p v-if="socket.socketState.connected">Connected to WebSocket server!</p>
      <p v-else>Not connected</p>

      <input type="text" v-model="message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>

      <p v-for="(msg, index) in socket.socketState.messages" :key="index">
        {{ msg.message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useSocket } from '@/services/socket.service';
import authService from '@/services/auth.service';
import { apiEndpoint } from '@/config';

import './main.sass';

const logOut = () => {
  authService.logOut();
};

const socket = useSocket(apiEndpoint);
const message = ref('');

onMounted(() => {
  socket.connect();
});

onBeforeUnmount(() => {
  socket.disconnect();
});

function sendMessage() {
  socket.sendMessage(message.value);
  message.value = '';
}
</script>
