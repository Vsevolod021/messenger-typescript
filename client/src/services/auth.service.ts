import { apiEndpoint } from '@/config';
import Api from './api.service';

class AuthService {
  public api;

  constructor(api: Api) {
    this.api = api;
  }

  async logIn(body: { login: string; password: string }) {
    const url = `${apiEndpoint}/auth/login`;

    const responseData = await this.api.post(url, body);

    localStorage.setItem('token', JSON.stringify(responseData));

    return await responseData;
  }

  async signUp(body: { login: string; password: string; name: string; surname: string }) {
    const url = `${apiEndpoint}/auth/register`;

    const responseData = await this.api.post(url, body);

    localStorage.setItem('token', JSON.stringify(responseData));

    return await responseData;
  }

  async getProfile() {
    const url = `${apiEndpoint}/auth/profile`;

    return await this.api.get(url);
  }

  logOut() {
    localStorage.removeItem('token');
  }
}

const api = new Api();

export default new AuthService(api);
