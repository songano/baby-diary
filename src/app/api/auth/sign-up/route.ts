import { NextResponse } from 'next/server';

// POST /api/auth/sign-up

export async function POST(req: Request) {
  try {
    const { nickname, email, password, relationship } = await req.json();

    if (!nickname || !email || !password || !relationship)
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });

    // 실제로는 DB에 저장해야함
    console.log('NEW user: ', { email, nickname });
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
