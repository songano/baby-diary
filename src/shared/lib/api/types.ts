interface ApiConfig {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  onRequest?: (config: ApiConfig) => ApiConfig | Promise<ApiConfig>;
}
