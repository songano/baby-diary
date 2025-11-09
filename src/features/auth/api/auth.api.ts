import { CheckNicknameRequest, CheckNicknameResponse } from '../types/auth.types';

const API_BASE_URL = '/api/auth';

export const authApi = {
  // 닉네임 중복 확인
  checkNickname: async (data: CheckNicknameRequest): Promise<CheckNicknameResponse> => {
    const response = await fetch(`${API_BASE_URL}/check-nickname`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '닉네임 확인에 실패했습니다.');
    }

    return response.json();
  },

  // 이메일 인증 및 중복 확인

  // 회원가입

  // 로그인
};
