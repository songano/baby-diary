import { z } from 'zod';

import { emailSchema, nicknameSchema, passwordSchema } from '@/shared/utils/validation';

import { RELATIONSHIP_VALUES } from '../constants/auth.constants';

/**
 * 회원가입 폼 스키마
 */
export const signUpFormSchema = z
  .object({
    nickname: nicknameSchema,
    email: emailSchema,
    emailVerified: z.boolean().refine(val => val === true, '이메일 인증을 완료해주세요'),
    password: passwordSchema,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요'),
    relationship: z.enum(RELATIONSHIP_VALUES, '관계를 선택해주세요'),
    customRelationship: z.string().max(20, '관계는 20자 이내로 입력해주세요').optional(),
    agreeToService: z.boolean().refine(val => val === true, '서비스 이용약관에 동의해주세요'),
    agreeToPrivacy: z.boolean().refine(val => val === true, '개인정보 처리방침에 동의해주세요'),
    agreeToMarketing: z.boolean().optional(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })
  .refine(
    data => {
      if (data.relationship === 'other') {
        return data.customRelationship && data.customRelationship.length > 0;
      }
      return true;
    },
    {
      message: '관계를 입력해주세요',
      path: ['customRelationship'],
    }
  );

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

/**
 * 로그인 폼 스키마
 */
export const signInFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력헤주세요'),
  rememberMe: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
