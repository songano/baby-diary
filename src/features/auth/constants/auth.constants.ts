/**
 * 관계 타입
 */
export const RELATIONSHIP_VALUES = [
  'mother',
  'father',
  'grandmother_paternal',
  'grandfather_paternal',
  'grandmother_maternal',
  'grandfather_maternal',
  'aunt_maternal',
  'aunt_paternal',
  'uncle',
  'guardian',
  'other',
] as const;

export type RelationshipType = (typeof RELATIONSHIP_VALUES)[number];

/**
 * 관계 표시명
 */
export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  mother: '엄마',
  father: '아빠',
  grandmother_paternal: '할머니',
  grandfather_paternal: '할아버지',
  grandmother_maternal: '외할머니',
  grandfather_maternal: '외할아버지',
  aunt_maternal: '이모',
  aunt_paternal: '고모',
  uncle: '삼촌',
  guardian: '보호자',
  other: '기타',
};

/**
 * 관계 옵션 배열 (Select에서 사용)
 */
export const RELATIONSHIP_OPTIONS = RELATIONSHIP_VALUES.map(value => ({
  value,
  label: RELATIONSHIP_LABELS[value],
}));

/**
 * 약관 타입
 */
export const TERMS_TYPES = {
  SERVICE: 'service',
  PRIVACY: 'privacy',
  MARKETING: 'marketing',
} as const;

/**
 * 인증 관련 시간 제한 (초)
 */
export const AUTH_TIMEOUTS = {
  EMAIL_VERIFICATION_EXPIRES: 5 * 60, // 5분
  PASSWORD_RESET_EXPIRES: 30 * 60, // 30분
  SESSION_EXPIRES: 24 * 60 * 60, // 24시간
} as const;

/**
 * 재시도 제한
 */
export const AUTH_LIMITS = {
  MAX_LOGIN_ATTEMPTS: 5,
  MAX_EMAIL_SEND_PER_DAY: 5, // 하루 이메일 전송 횟수 5회 제한
  LOCKOUT_DURATION: 30 * 60, // 30분
} as const;
