const SERVER_URL = process.env.SERVER_URL;
const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=utf-8',
};

export class HttpService {
  private static bearerToken = '';

  private static handleFetch = async (url: string, options: any): Promise<unknown> => {
    const response = await fetch(`${SERVER_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
        ...options.headers,
        // Authorization: `Bearer ${this.bearerToken}`,
      },
    });
    if (response.ok) {
      const data = await response.text();
      try {
        return JSON.parse(data) as unknown;
      } catch {
        return !data ? undefined : data;
      }
    } else {
      // Handle errors
      throw new Response(response.statusText, {
        status: response.status,
      });
    }
  };

  static get = async (url: string, config: any = {}): Promise<unknown> => {
    const options = {
      ...config,
      method: 'get',
    };
    return await this.handleFetch(url, options);
  };

  static post = async (url: string, data: unknown, config: any = {}): Promise<unknown> => {
    const options = {
      ...config,
      method: 'POST',
      headers: {
        ...commonHeaders,
        ...config.headers,
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return await this.handleFetch(url, options);
  };

  static delete = async (url: string, data?: unknown, config: any = {}): Promise<unknown> => {
    const options = {
      ...config,
      method: 'DELETE',
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return await this.handleFetch(url, options);
  };

  static put = async (url: string, data?: unknown, config: any = {}): Promise<unknown> => {
    const options = {
      ...config,
      method: 'PUT',
      headers: {
        ...commonHeaders,
        ...config.headers,
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return await this.handleFetch(url, options);
  };

  static setBearerToken = (token: string) => {
    this.bearerToken = token;
  };
}
