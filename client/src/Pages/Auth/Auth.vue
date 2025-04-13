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
          error-message="Please add first name"
          :error="errors.includes('name')"
          v-model:value="authForm.name"
          @input-change="onInputChange"
          placeholder="first name"
          name="name"
        />
        <Input
          v-if="pageType === 'reg'"
          :error="errors.includes('surname')"
          v-model:value="authForm.surname"
          @input-change="onInputChange"
          placeholder="last name"
          name="surname"
        />
        <Input
          :error="errors.includes('login')"
          error-message="Please add login"
          v-model:value="authForm.login"
          @input-change="onInputChange"
          placeholder="login"
          input-type="text"
          name="login"
        />
        <Input
          :error="errors.includes('password')"
          error-message="Please add password"
          v-model:value="authForm.password"
          @input-change="onInputChange"
          placeholder="password"
          input-type="password"
          name="password"
        />
        <Input
          :error-message="repeatPasswordErrorMessage"
          :error="errors.includes('passwordRepeat')"
          v-model:value="authForm.passwordRepeat"
          @input-change="onInputChange"
          placeholder="repeat password"
          v-if="pageType === 'reg'"
          input-type="password"
          name="passwordRepeat"
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
import authService from '@/services/auth.service';
import Input from '@/components/Input/Input.vue';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import './auth.sass';

interface AuthForm {
  login: string;
  password: string;
  surname: string;
  name: string;
  passwordRepeat: string;
}

type PageType = 'auth' | 'reg';

const formTemplate = { login: '', password: '', surname: '', name: '', passwordRepeat: '' };

const router = useRouter();

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

const logIn = async () => {
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

  authService
    .logIn(authForm)
    .then(() => {
      Object.keys(authForm).forEach((key) => (authForm[key as keyof AuthForm] = ''));
      router.push('/main');
    })
    .catch((err) => alert(err));
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

  authService
    .signUp(authForm)
    .then(() => {
      Object.keys(authForm).forEach((key) => (authForm[key as keyof AuthForm] = ''));
      router.push('/main');
    })
    .catch((err) => alert(err));
};
</script>
