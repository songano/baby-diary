import { z } from 'zod';

import {
  EMAIL_CONSTRAINTS,
  FORBIDDEN_NICKNAME_PATTERNS,
  FORBIDDEN_NICKNAMES,
  NICKNAME_CONSTRAINTS,
  PASSWORD_CONSTRAINTS,
} from '../constants';

/**
 * 금지 닉네임 체크
 */
export function isForbiddenNickname(nickname: string): boolean {
  const normalized = nickname.toLowerCase().trim();

  // 1. 금지 목록에 정확히 일치하는지 확인
  const isInForbiddenList = FORBIDDEN_NICKNAMES.some(forbidden => normalized === forbidden.toLowerCase());

  if (isInForbiddenList) return true;

  // 2. 금지 패턴에 매칭되는지 확인
  const matchesForbiddenPattern = FORBIDDEN_NICKNAME_PATTERNS.some(pattern => pattern.test(normalized));

  return matchesForbiddenPattern;
}

/**
 * 닉네임 검증 스키마
 */
export const nicknameSchema = z
  .string()
  .min(NICKNAME_CONSTRAINTS.MIN_LENGTH, `닉네임은 ${NICKNAME_CONSTRAINTS.MIN_LENGTH}자 이상이어야 합니다`)
  .max(NICKNAME_CONSTRAINTS.MAX_LENGTH, `닉네임은 ${NICKNAME_CONSTRAINTS.MAX_LENGTH}자 이내로 입력해주세요`)
  .regex(NICKNAME_CONSTRAINTS.PATTERN, NICKNAME_CONSTRAINTS.PATTERN_MESSAGE)
  .refine(nickname => !isForbiddenNickname(nickname), '사용할 수 없는 닉네임입니다');

/**
 * 이메일 검증 스키마
 */
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .max(EMAIL_CONSTRAINTS.MAX_LENGTH, '이메일이 너무 깁니다')
  .email('올바른 이메일 형식이 아닙니다')
  .toLowerCase();

/**
 * 비밀번호 검증 스키마
 */
export const passwordSchema = z
  .string()
  .min(PASSWORD_CONSTRAINTS.MIN_LENGTH, `비밀번호는 ${PASSWORD_CONSTRAINTS.MIN_LENGTH}자 이상이어야 합니다`)
  .max(PASSWORD_CONSTRAINTS.MAX_LENGTH, `비밀번호는 ${PASSWORD_CONSTRAINTS.MAX_LENGTH}자 이내로 입력해주세요`)
  .regex(PASSWORD_CONSTRAINTS.PATTERN, PASSWORD_CONSTRAINTS.PATTERN_MESSAGE);

/**
 * 이미지 파일 검증 스키마
 */
export const imageFileSchema = z
  .instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, '파일 크기는 5MB 이하여야 합니다')
  .refine(
    file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    'JPG, PNG, WEBP 파일만 업로드 가능합니다'
  );

// 과거날짜
export const pastDateSchema = z.string().refine(date => new Date(date) <= new Date(), '과거 날짜를 선택해주세요');
