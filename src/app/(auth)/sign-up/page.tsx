import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import SignUpForm from '@/features/auth/components/sign-up-form';

const SignupPage = () => {
  return (
    <>
      <Link href="/sign-in" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:underline">
        <ArrowLeft className="size-4" />
        <span>로그인 페이지로 이동하기</span>
      </Link>

      <h3 className="text-center text-2xl font-bold">회원가입</h3>

      <SignUpForm />
    </>
  );
};

export default SignupPage;
