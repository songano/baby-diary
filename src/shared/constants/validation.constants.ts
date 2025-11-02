/**
 * 금지 닉네임 목록
 * - 관리자/운영자 관련
 * - 서비스명
 * - 부적절한 단어
 */
export const FORBIDDEN_NICKNAMES = [
  // 관리자/운영자
  '관리자',
  '운영자',
  '어드민',
  'admin',
  'administrator',
  'moderator',
  'mod',
  'manager',
  'system',
  'root',
  'superuser',

  // 서비스명
  '베이비다이어리',
  'babydiary',
  '아기다이어리',

  // 일반적인 금지어
  '테스트',
  'test',
  'null',
  'undefined',
  'anonymous',
  '익명',

  // 욕설/비속어 (필요시 추가)
  '바보',
  '멍청이',
] as const;

/**
 * 금지 닉네임 패턴 (정규식)
 */
export const FORBIDDEN_NICKNAME_PATTERNS = [
  /관리자/i,
  /admin/i,
  /운영자/i,
  /moderator/i,
  /system/i,
  /베이비다이어리/i,
] as const;

/**
 * 닉네임 제약사항
 */
export const NICKNAME_CONSTRAINTS = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  PATTERN: /^[가-힣a-zA-Z0-9_]+$/,
  PATTERN_MESSAGE: '공백없이 한글, 영문, 숫자, 언더스코어만 사용 가능합니다',
} as const;

/**
 * 비밀번호 제약사항
 */
export const PASSWORD_CONSTRAINTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 50,
  PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
  PATTERN_MESSAGE: '영문 대소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다',
} as const;

/**
 * 이메일 제약사항
 */
export const EMAIL_CONSTRAINTS = {
  MAX_LENGTH: 100,
} as const;
