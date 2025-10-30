// 🔥 앱 전체에서 사용하는 상수
export const APP_META = {
  NAME: '우리 아기 다이어리',
  DESCRIPTION: '아기의 성장을 기록하고 공유하는 다이어리',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@babydiary.com',
} as const;

/**
 * 파일 업로드 제약
 */
export const FILE_UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES_PER_UPLOAD: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

/**
 * Pagination 기본값
 */
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * 날짜 포맷
 */
export const DATE_FORMATS = {
  DISPLAY: 'yyyy년 MM월 dd일',
  API: 'yyyy-MM-dd',
  DATETIME: 'yyyy-MM-dd HH:mm:ss',
} as const;

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  SELECTED_BABY_ID: 'selected_baby_id',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;
