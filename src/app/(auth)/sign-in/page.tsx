import Link from 'next/link';
import SignInForm from '../../../features/auth/components/sign-in-form';
import { Button } from '@/shared/components/ui/button';
import { SeparatorText } from '@/shared/components/ui/separator';

const LoginPage = () => {
  return (
    <>
      {/* 로고 */}
      <div className="mb-4 flex items-center justify-center">
        {/* <Image src="/logo.png" alt="Logo" width={100} height={100} /> */}
        <h1 className="text-2xl font-bold">BABY DIARY</h1>
      </div>

      {/* 로그인 폼 */}
      <SignInForm />

      <div className="flex justify-between">
        {/* 회원가입 */}
        <div className="text-center text-sm text-gray-500 hover:underline">
          <Link href="/sign-up">회원가입</Link>
        </div>

        {/* 아이디/비밀번호 찾기 */}
        <div className="text-sm text-gray-500">
          <Link href="/forgot-password">아이디/비밀번호 찾기</Link>
        </div>
      </div>

      <SeparatorText text="또는" />

      {/* 소셜로그인 */}
      <div className="flex flex-col justify-center gap-1">
        <Button className="w-full bg-gray-300 text-black">Google로 이용하기</Button>
        <Button className="w-full bg-yellow-500 text-black">카카오로 이용하기</Button>
        <Button className="w-full bg-green-600">네이버로 이용하기</Button>
      </div>
    </>
  );
};

export default LoginPage;
