'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/shared/components/ui/input-group';
import { Label } from '@/shared/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Click Submit Button');
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <Input type="text" placeholder="Email" />
      </div>
      <InputGroup>
        <InputGroupInput type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Toggle password visibility" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <Button type="submit">Submit</Button>

      <div className="flex justify-between">
        {/* 자동로그인 */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me" className="cursor-pointer text-sm text-gray-500">
            자동로그인
          </Label>
        </div>

        {/* 아이디/비밀번호 찾기 */}
        <div className="text-sm text-gray-500">
          <Link href="/forgot-password">아이디/비밀번호 찾기</Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
