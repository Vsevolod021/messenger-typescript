<template>
  <div>
    <h1>Вы авторизованы!</h1>
    <button @click="logOut">Выйти</button>
  </div>
</template>

<script lang="ts" setup>
import authService from '@/services/auth.service';

import './main.sass';

const logOut = () => {
  authService.logOut();
};
</script>
