'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

import { SignUpFormData, signUpFormSchema } from '../utils/validation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RELATIONSHIP_OPTIONS } from '../constants/auth.constants';
import dynamic from 'next/dynamic';

const DevTool: React.ElementType = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const SignUpForm = () => {
  const methods = useForm<SignUpFormData>({
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

  const { control, handleSubmit, watch } = methods;

  const watchRelationship = watch('relationship');

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
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
                  <Input
                    {...field}
                    id="nickname"
                    aria-invalid={fieldState.invalid}
                    placeholder="닉네임을 입력해주세요"
                  />
                  <Button variant={'secondary'}>중복확인</Button>
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
                  <Button variant={'secondary'}>인증하기</Button>
                </div>
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

                {watchRelationship === 'other' && (
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
                  <FieldLabel htmlFor="marketingTerm">
                    <span className="text-xs">마케팅 정보 수신동의(선택)</span>
                  </FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldGroup>

        <Button type="submit" className="mt-9">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default SignUpForm;
