type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
}

interface RequestConfig extends FetchOptions {
  url: string;
  method: HttpMethod;
  body?: any;
  params?: Record<string, any>;
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
    public data?: any,
    public response?: Response
  ) {
    super(message);
    this.name = 'FetchError';
  }
}
