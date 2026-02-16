import z from 'zod';

import { nicknameSchema } from '@/shared/utils';

export const checkNicknameSchema = z.object({
  nickname: nicknameSchema,
});

export type CheckNicknameDto = z.infer<typeof checkNicknameSchema>;

export interface CheckNicknameResponseDto {
  available: boolean;
  nickname: string;
}
