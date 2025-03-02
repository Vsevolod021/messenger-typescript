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
        <Input
          v-if="pageType === 'reg'"
          v-model:value="authForm.firstName"
          placeholder="first name"
          :error="errors.includes('firstName')"
          error-message="Please add first name"
          name="firstName"
          @input-change="onInputChange"
        />
        <Input
          v-if="pageType === 'reg'"
          v-model:value="authForm.lastName"
          placeholder="last name"
          :error="errors.includes('lastName')"
          name="lastName"
          @input-change="onInputChange"
        />
        <Input
          v-model:value="authForm.login"
          placeholder="login"
          input-type="text"
          :error="errors.includes('login')"
          error-message="Please add login"
          name="login"
          @input-change="onInputChange"
        />
        <Input
          v-model:value="authForm.password"
          placeholder="password"
          input-type="password"
          :error="errors.includes('password')"
          error-message="Please add password"
          name="password"
          @input-change="onInputChange"
        />
        <Input
          v-if="pageType === 'reg'"
          v-model:value="authForm.passwordRepeat"
          placeholder="repeat password"
          :error="errors.includes('passwordRepeat')"
          :error-message="repeatPasswordErrorMessage"
          name="passwordRepeat"
          @input-change="onInputChange"
        />
      </form>

      <button v-if="pageType === 'reg'" class="auth-form__submit-button" @click.prevent="signUp">
        Sign up me
      </button>
      <button v-else class="auth-form__submit-button" @click.prevent="logIn">Log in me</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Input from '@/components/Input/Input.vue';
import { ref, reactive } from 'vue';
import './auth.sass';

interface AuthForm {
  login: string;
  password: string;
  lastName: string;
  firstName: string;
  passwordRepeat: string;
}

type PageType = 'auth' | 'reg';

const formTemplate = { login: '', password: '', lastName: '', firstName: '', passwordRepeat: '' };

const authForm = reactive<AuthForm>({ ...formTemplate });
const errors = reactive<Array<string>>([]);
const pageType = ref<PageType>('auth');

const repeatPasswordErrorMessage = ref<string>('Please add password');

const changePageType = () => {
  Object.keys(authForm).forEach((key) => (authForm[key as keyof AuthForm] = ''));

  if (pageType.value === 'auth') {
    return (pageType.value = 'reg');
  }

  pageType.value = 'auth';
};

const onInputChange = (name: string) => {
  const index = errors.findIndex((errorField) => errorField === name);

  if (index === -1) {
    return;
  }

  errors.splice(index, 1);
};

const logIn = () => {
  Object.keys(authForm).forEach((key) => {
    if (key !== 'login' && key !== 'password') {
      return;
    }

    if (authForm[key as keyof AuthForm] === '') {
      errors.push(key);
    }
  });

  if (errors.length !== 0) {
    return;
  }

  Object.keys(authForm).forEach((key) => (authForm[key as keyof AuthForm] = ''));
  alert('sucess');
};

const signUp = () => {
  Object.keys(authForm).forEach((key) => {
    if (authForm[key as keyof AuthForm] === '') {
      errors.push(key);
    }
  });

  if (!errors.includes('passwordRepeat') && authForm.password !== authForm.passwordRepeat) {
    repeatPasswordErrorMessage.value = "Passwords don't match";
    errors.push('passwordRepeat');
  }

  if (errors.length !== 0) {
    return;
  }

  Object.keys(authForm).forEach((key) => (authForm[key as keyof AuthForm] = ''));
  alert('sucess');
};
</script>
