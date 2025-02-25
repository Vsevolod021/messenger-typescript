<template>
  <div class="auth">
    <div class="auth-block">
      <h1 v-if="pageType === 'reg'" class="auth-block__title">Create New Account</h1>
      <h1 v-else class="auth-block__title">Log in</h1>

      <div class="auth-block__to-log-in">
        <span v-if="pageType === 'reg'">You already have an account?</span>
        <span v-else>Don't you have an account?</span>

        <button v-if="pageType === 'reg'" @click="changePageType">Log in</button>
        <button v-else @click="changePageType">Sign up</button>
      </div>

      <form class="auth-form">
        <div class="auth-form__inputs">
          <div v-if="pageType === 'reg'" class="auth-form__first-name">
            <input v-model="authForm.firstName" class="auth-form__input" placeholder="first name" />
            <p class="auth-form__error"></p>
          </div>

          <div v-if="pageType === 'reg'" class="auth-form__last-name">
            <input v-model="authForm.lastName" class="auth-form__input" placeholder="last name" />
          </div>

          <div class="auth-form__login">
            <input v-model="authForm.login" class="auth-form__input" placeholder="login" />
            <p class="auth-form__error"></p>
          </div>

          <div class="auth-form__password">
            <input v-model="authForm.password" class="auth-form__input" placeholder="password" />
            <p class="auth-form__error"></p>
          </div>

          <div v-if="pageType === 'reg'" class="auth-form__password-repeat">
            <input
              v-model="authForm.passwordRepeat"
              class="auth-form__input"
              placeholder="repeat password"
            />
            <p class="auth-form__error"></p>
          </div>
        </div>
      </form>

      <button v-if="pageType === 'reg'" class="auth-form__submit-button" @click.prevent="signUp">
        Sign up me
      </button>
      <button v-else class="auth-form__submit-button" @click.prevent="logIn">Log in me</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import './auth.sass';

type PageType = 'auth' | 'reg';

interface AuthForm {
  login: string;
  password: string;
  lastName: string;
  firstName: string;
  passwordRepeat: string;
}

export default defineComponent({
  setup() {
    const pageType = ref<PageType>('auth');

    const authForm = reactive<AuthForm>({
      login: '',
      password: '',
      lastName: '',
      firstName: '',
      passwordRepeat: ''
    });

    const changePageType = () => {
      if (pageType.value === 'auth') {
        return (pageType.value = 'reg');
      }

      pageType.value = 'auth';
    };

    const logIn = () => {};

    const signUp = () => {};

    return { pageType, authForm, changePageType, logIn, signUp };
  }
});
</script>
