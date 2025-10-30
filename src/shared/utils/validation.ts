import { z } from 'zod';

// 이메일
export const emailSchema = z.string().email('올바른 이메일 형식이 아닙니다').toLowerCase();

// 비밀번호
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '영문 대소문자와 숫자를 포함해야 합니다');

// 파일
export const imageFileSchema = z
  .instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, '파일 크기는 5MB 이하여야 합니다')
  .refine(
    file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    'JPG, PNG, WEBP 파일만 업로드 가능합니다'
  );

// 과거날짜
export const pastDateSchema = z.string().refine(date => new Date(date) <= new Date(), '과거 날짜를 선택해주세요');
