type Method = 'GET' | 'POST';

class Api {
  jsonHeaders = { 'Content-Type': 'application/json' };

  async fetchData(url: string, method: Method = 'GET', body: object = {}) {
    const localStorageData = JSON.parse(localStorage.getItem('token') || '{}');
    const token = localStorageData?.access_token || '';

    const headers = { ...this.jsonHeaders, Authorization: `Bearer ${token}` };
    const options = { method, headers, body: JSON.stringify(body) };

    const response = await fetch(url, options);

    if (response.status === 401) {
      const { router } = await import('@/router');

      localStorage.removeItem('token');
      router.navigate('/auth');
    }

    if (!response.ok) {
      const ErrorData = await response.json();

      throw new Error(ErrorData.message);
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
