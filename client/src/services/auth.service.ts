import { apiEndpoint } from '@/config';

class AuthService {
  async login({ login, password }: { login: string; password: string }) {
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
}

export default new AuthService();
