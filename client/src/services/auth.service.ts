import { apiEndpoint } from '@/config';
import router from '@/router';

class AuthService {
  async logIn({ login, password }: { login: string; password: string }) {
    const body = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
      body: JSON.stringify({ login, password })
    };

    const response = await fetch(`${apiEndpoint}/auth/login`, body);

    if (response.ok) {
      const token = await response.json();

      return localStorage.setItem('token', JSON.stringify(token));
    }

    throw new Error('unauthorized');
  }

  async signUp({
    login,
    password,
    name,
    surname
  }: {
    login: string;
    password: string;
    name: string;
    surname: string;
  }) {
    const body = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
      body: JSON.stringify({ login, password, name, surname })
    };

    const response = await fetch(`${apiEndpoint}/auth/register`, body);

    if (response.ok) {
      const token = await response.json();

      return localStorage.setItem('token', JSON.stringify(token));
    }

    throw new Error('unauthorized');
  }

  logOut() {
    localStorage.removeItem('token');
    router.push('/auth');
  }
}

export default new AuthService();
