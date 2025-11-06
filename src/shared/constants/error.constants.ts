/**
 * API 에러 코드 저으이
 * 백엔드와 프론트엔드에서 공통으로 사용하는 에러 코드
 */
export const ERROR_CODES = {
  // 인증관련 (1000번대)
  UNAUTHORIZED: 'AUTH_001',
  TOKEN_EXPIRED: 'AUTH_002',
  INVALID_TOKEN: 'AUTH_003',
  FORBIDDEN: 'AUTH_004',

  // 유효성 검증 (2000번대)
  VALIDATION_ERROR: 'VAL_001',
  INVALID_INPUT: 'VAL_002',
  MISSING_REQUIRED_FIELD: 'VAL_003',

  // 데이터베이스 (3000번대)
  NOT_FOUND: 'DB_001',
  DUPLICATE_ENTRY: 'DB_002',
  DATABASE_ERROR: 'DB_003',

  // 비즈니스 로직 (4000번대)
  BUSINESS_RULE_VIOLATION: 'BIZ_001',
  INSUFFICIENT_PERMISSION: 'BIZ_002',
  RESOURCE_LOCKED: 'BIZ_003',

  // 서버 에러 (5000번대)
  INTERNAL_SERVER_ERROR: 'SRV_001',
  SERVICE_UNAVAILABLE: 'SRV_002',
  GATEWAY_TIMEOUT: 'SRV_003',

  // 네트워크 (6000번대)
  NETWORK_ERROR: 'NET_001',
  TIMEOUT: 'NET_002',

  // 기타
  UNKNOWN_ERROR: 'ERR_999',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * 에러 코드별 기본 메시지 맵핑
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // 인증 관련
  [ERROR_CODES.UNAUTHORIZED]: '인증이 필요합니다. 다시 로그인해주세요.',
  [ERROR_CODES.TOKEN_EXPIRED]: '세션이 만료되었습니다. 다시 로그인해주세요.',
  [ERROR_CODES.INVALID_TOKEN]: '유효하지 않은 인증 정보입니다.',
  [ERROR_CODES.FORBIDDEN]: '접근 권한이 없습니다.',

  // 유효성 검증
  [ERROR_CODES.VALIDATION_ERROR]: '입력값이 올바르지 않습니다.',
  [ERROR_CODES.INVALID_INPUT]: '잘못된 입력값입니다.',
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: '필수 항목이 누락되었습니다.',

  // 데이터베이스
  [ERROR_CODES.NOT_FOUND]: '요청하신 데이터를 찾을 수 없습니다.',
  [ERROR_CODES.DUPLICATE_ENTRY]: '이미 존재하는 데이터입니다.',
  [ERROR_CODES.DATABASE_ERROR]: '데이터베이스 오류가 발생했습니다.',

  // 비즈니스 로직
  [ERROR_CODES.BUSINESS_RULE_VIOLATION]: '비즈니스 규칙 위반입니다.',
  [ERROR_CODES.INSUFFICIENT_PERMISSION]: '권한이 부족합니다.',
  [ERROR_CODES.RESOURCE_LOCKED]: '리소스가 잠겨있습니다.',

  // 서버 에러
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: '서버 오류가 발생했습니다.',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: '서비스를 사용할 수 없습니다.',
  [ERROR_CODES.GATEWAY_TIMEOUT]: '요청 시간이 초과되었습니다.',

  // 네트워크
  [ERROR_CODES.NETWORK_ERROR]: '네트워크 오류가 발생했습니다.',
  [ERROR_CODES.TIMEOUT]: '요청 시간이 초과되었습니다.',

  // 기타
  [ERROR_CODES.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
};

/**
 * HTTP 상태 코드를 에러 코드로 맵핑
 */
export const HTTP_STATUS_TO_ERROR_CODE: Record<number, ErrorCode> = {
  400: ERROR_CODES.VALIDATION_ERROR,
  401: ERROR_CODES.UNAUTHORIZED,
  403: ERROR_CODES.FORBIDDEN,
  404: ERROR_CODES.NOT_FOUND,
  409: ERROR_CODES.DUPLICATE_ENTRY,
  500: ERROR_CODES.INTERNAL_SERVER_ERROR,
  503: ERROR_CODES.SERVICE_UNAVAILABLE,
  504: ERROR_CODES.GATEWAY_TIMEOUT,
};
