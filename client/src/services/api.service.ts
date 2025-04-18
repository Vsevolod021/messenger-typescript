type Method = 'GET' | 'POST';

class Api {
  jsonHeaders = { 'Content-Type': 'application/json' };

  async fetchData(url: string, method: Method = 'GET', body: object = {}) {
    const token = JSON.parse(localStorage.getItem('token') || '').access_token;
    const headers = { ...this.jsonHeaders, Authorization: `Bearer ${token}` };

    const options = { method, headers, body: JSON.stringify(body) };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Error');
    }

    return await response.json();
  }

  async get(url: string) {
    return await this.fetchData(url);
  }

  async post(url: string, body: object) {
    return await this.fetchData(url, 'POST', body);
  }
}

export default Api;
