import { NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { authService } from '@/server/auth/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await authService.checkNicknameAvailable(body);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues?.[0]?.message ?? '유효하지 않은 요청입니다.',
        },
        { status: 400 }
      );
    }

    console.error('[CheckUsername Error]', error);

    return NextResponse.json(
      {
        success: false,
        error: '서버 오류가 발생했습니다',
      },
      { status: 500 }
    );
  }
}
