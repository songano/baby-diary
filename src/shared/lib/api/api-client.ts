/**
 * fetch wrapper
 */

class ApiClient {
  private baseUrl: string;
  private defaultTimeout = 30000; // 30초
  private defaultHeader: HeadersInit = {
    'Content-Type': 'application/json',
  };

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }
}

// Singleton 인스턴스 export
export const apiClient = new ApiClient();

// 외부 API용 별도 인스턴스 생성
export const createApiClient = (baseUrl: string) => new ApiClient(baseUrl);
