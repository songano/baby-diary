/* eslint-disable react-hooks/incompatible-library */
'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RELATIONSHIP_OPTIONS } from '../constants/auth.constants';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { authApi } from '../api/auth.api';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { SignUpFormData, signUpFormSchema } from '../utils/validation';

const DevTool: React.ElementType = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const SignUpForm = () => {
  const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
  const [isSentEmail, setIsSentEmail] = useState<boolean>(false);
  const [isNicknameCheckResult, setNicknameCheckResult] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange', // 실시간 검증
    defaultValues: {
      nickname: '',
      email: '',
      emailVerified: false,
      password: '',
      passwordConfirm: '',
      relationship: undefined,
      customRelationship: '',
      agreeToService: false,
      agreeToPrivacy: false,
      agreeToMarketing: false,
    },
  });

  const watchEmailVerified = watch('emailVerified');

  const onSubmit = async (formData: SignUpFormData) => {
    console.log(formData);
    // 닉네임 중복확인/이메일 인증이 완료되야 가입처리
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('회원가입이 완료되었습니다.');
      } else {
        console.log(result.message || '회원가입 실패');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      return;
    }
  };

  const handleVerifyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVerifyingEmail(true);
    setIsSentEmail(true);

    // email 형식 확인
    const isVerified = await trigger('email');
    if (!isVerified) return;

    // 임시로 체크
    setTimeout(() => {
      setValue('emailVerified', true);
      setIsVerifyingEmail(false);
    }, 3000);
  };

  const checkNickname = async () => {
    const nickname = watch('nickname');
    const res = await authApi.checkNickname({ nickname });

    console.log(res);

    if (res.available) {
      setNicknameCheckResult(true);
      toast.success('사용 가능한 닉네임입니다');
    } else {
      toast.warning('사용할 수 없는 닉네임입니다');
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* 닉네임 */}
          <Controller
            name="nickname"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
                <div className="flex gap-2">
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="nickname"
                      aria-invalid={fieldState.invalid}
                      placeholder="닉네임을 입력해주세요"
                      onChange={e => {
                        field.onChange(e.target.value);
                        setNicknameCheckResult(false);
                      }}
                    />
                    {isNicknameCheckResult && (
                      <InputGroupAddon align={'inline-end'}>
                        <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                          <CheckIcon className="size-3 stroke-3" />
                        </div>
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                  <Button
                    onClick={checkNickname}
                    type="button"
                    variant={'secondary'}
                    disabled={fieldState.invalid || !field.value}
                  >
                    중복확인
                  </Button>
                </div>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {/* 이메일 */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <div className="flex gap-2">
                  <Input {...field} id="email" aria-invalid={fieldState.invalid} placeholder="이메일을 입력해주세요" />
                  <Button
                    variant={'secondary'}
                    disabled={fieldState.invalid || !field.value || watchEmailVerified}
                    onClick={handleVerifyEmail}
                  >
                    {watchEmailVerified ? '인증완료' : '인증하기'}
                  </Button>
                </div>
                {isSentEmail && <Input type="text" id="verifyCode" placeholder="인증코드를 입력해주세요" />}
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {/* 비밀번호 */}
          <Field>
            <FieldLabel>비밀번호</FieldLabel>
            <FieldDescription>2-20자, 한글/영문/숫자/언더스코어 사용 가능</FieldDescription>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </>
              )}
            />

            {/* 비밀번호 확인 */}
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    id="passwordConfirm"
                    placeholder="비밀번호를 다시 입력해주세요"
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </>
              )}
            />
          </Field>

          {/* 관계 */}
          <Controller
            name="relationship"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="relationship">관계</FieldLabel>
                <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="relationship" aria-invalid={fieldState.invalid} className="w-full">
                    <SelectValue placeholder="관계를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError>{fieldState.error?.message}</FieldError>

                {/* 관계기타 정의 */}
                {field.value === 'other' && (
                  <Controller
                    name="customRelationship"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          placeholder="관계를 입력해주세요"
                          aria-invalid={fieldState.invalid}
                          value={field.value}
                          onChange={field.onChange}
                          maxLength={20}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </>
                    )}
                  />
                )}
              </Field>
            )}
          />

          {/* 약관 */}
          <FieldGroup>
            {/* 서비스 이용약관 동의 */}
            <Controller
              name="agreeToService"
              control={control}
              render={({ field, fieldState }) => (
                <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
                  <Checkbox
                    id="agreeToService"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel htmlFor="agreeToService">
                    <span className="text-xs">서비스 이용약관 동의(필수)</span>
                  </FieldLabel>
                  {/* <FieldError errors={[fieldState.error]} /> */}
                </Field>
              )}
            />

            {/* 개인정보 처리방침 동의 */}
            <Controller
              name="agreeToPrivacy"
              control={control}
              render={({ field, fieldState }) => (
                <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel htmlFor="agreeToPrivacy">
                    <span className="text-xs">개인정보 처리방침 동의(필수)</span>
                  </FieldLabel>
                </Field>
              )}
            />

            {/* 마케팅 정보 수신동의 */}
            <Controller
              name="agreeToMarketing"
              control={control}
              render={({ field, fieldState }) => (
                <Field orientation={'horizontal'} data-invalid={fieldState.invalid}>
                  <Checkbox
                    id="agreeToMarketing"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel htmlFor="agreeToMarketing">
                    <span className="text-xs">마케팅 정보 수신동의(선택)</span>
                  </FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldGroup>

        {/* 회원가입 버튼 */}
        <Button type="submit" className="mt-9">
          회원가입
        </Button>

        {/* 개발모드 : 디버그 */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-500">디버그 정보</summary>
            <pre className="mt-2 max-h-96 overflow-auto rounded bg-gray-100 p-4 text-xs">
              {JSON.stringify(
                {
                  values: watch(),
                  errors,
                  // nicknameCheckResult,
                },
                null,
                2
              )}
            </pre>
          </details>
        )}
      </form>

      <DevTool control={control} />
    </>
  );
};

export default SignUpForm;
