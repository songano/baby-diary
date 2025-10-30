import { z } from 'zod';

export const signUpFormSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(20, '닉네임은 20자 이내로 입력해주세요')
    .regex(/^[가-힣a-zA-Z0-9_]+$/, '한글, 영문, 숫자, 언더스코어만 사용 가능합니다'),
});
