import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/shared/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { nickname } = await request.json();

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.from('profiles').select('nickname').eq('nickname', nickname).single();

    const available = !data;

    return NextResponse.json({
      available,
      message: available ? '사용 가능한 닉네임입니다' : '이미 사용 중인 닉네임입니다',
    });
  } catch (error) {
    console.error('Check nickname error: ', error);
    return NextResponse.json({ success: false, message: '오류가 발생했습니다' }, { status: 500 });
  }
}
