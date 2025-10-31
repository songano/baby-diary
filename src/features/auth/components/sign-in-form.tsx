'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/shared/components/ui/input-group';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SignInFormData, signInFormSchema } from '../utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (formData: SignInFormData) => {
    console.log(formData);
    console.log('Click Submit Button');
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* 이메일 */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <Input {...field} type="text" placeholder="이메일" aria-invalid={fieldState.invalid} />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </FieldGroup>

      {/* 비밀번호 */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <InputGroup>
              <InputGroupInput
                {...field}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Toggle password visibility" onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      {/* 자동로그인 */}
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <Field orientation={'horizontal'}>
            <Checkbox onCheckedChange={field.onChange} checked={field.value} id="rememberMe" />
            <FieldLabel htmlFor="rememberMe" className="cursor-pointer text-sm text-gray-500">
              자동로그인
            </FieldLabel>
          </Field>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignInForm;
