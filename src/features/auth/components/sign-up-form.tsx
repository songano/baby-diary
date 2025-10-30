'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { useEffect, useState } from 'react';

const SignUpForm = () => {
  const [relationship, setRelationship] = useState<string>('');
  const [customRelationship, setCustomRelationship] = useState<string>('');

  useEffect(() => {
    if (relationship !== 'other') {
      setTimeout(() => {
        setCustomRelationship('');
      }, 0);
    }
  }, [relationship]);

  return (
    <form className="flex flex-col gap-2" autoComplete="off">
      <FieldGroup>
        {/* 닉네임 */}
        <Field>
          <FieldLabel htmlFor="email">닉네임</FieldLabel>
          <div className="flex gap-2">
            <Input id="userId" placeholder="닉네임을 입력해주세요" />
            <Button variant={'secondary'}>중복확인</Button>
          </div>
          {/* <FieldError>아이디를 입력해주세요</FieldError> */}
        </Field>

        {/* 이메일 */}
        <Field>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <div className="flex gap-2">
            <Input id="userId" placeholder="이메일을 입력해주세요" />
            <Button variant={'secondary'}>인증하기</Button>
          </div>
          {/* <FieldError>아이디를 입력해주세요</FieldError> */}
        </Field>

        {/* 비밀번호 */}
        <Field>
          <FieldLabel>비밀번호</FieldLabel>
          <Input type="password" id="password" placeholder="비밀번호를 입력해주세요" />
          <Input type="password" id="re-password" placeholder="비밀번호를 다시 입력해주세요" />
          {/* <FieldDescription>최소 8자 이상</FieldDescription>z */}
        </Field>

        {/* 관계 */}
        <Field>
          <FieldLabel>관계</FieldLabel>
          <Select value={relationship} onValueChange={setRelationship}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="관계를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mother">엄마</SelectItem>
              <SelectItem value="father">아빠</SelectItem>
              <SelectItem value="grandmother_paternal">할머니</SelectItem>
              <SelectItem value="grandfather_paternal">할아버지</SelectItem>
              <SelectItem value="grandmother_maternal">외할머니</SelectItem>
              <SelectItem value="grandfather_maternal">외할아버지</SelectItem>
              <SelectItem value="aunt_maternal">이모</SelectItem>
              <SelectItem value="aunt_paternal">고모</SelectItem>
              <SelectItem value="uncle">삼촌</SelectItem>
              <SelectItem value="guardian">보호자</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>

          {relationship === 'other' && (
            <Input
              placeholder="관계를 입력해주세요"
              value={customRelationship}
              onChange={e => setCustomRelationship(e.target.value)}
              maxLength={20}
            />
          )}
        </Field>

        {/* 약관 */}
        <FieldGroup>
          <Field orientation={'horizontal'}>
            <Checkbox id="serviceTerm" />
            <FieldLabel htmlFor="serviceTerm">
              <span className="text-xs">서비스 이용약관 동의(필수)</span>
            </FieldLabel>
          </Field>
          <Field orientation={'horizontal'}>
            <Checkbox id="privacyTerm" />
            <FieldLabel htmlFor="privacyTerm">
              <span className="text-xs">개인정보 처리방침 동의(필수)</span>
            </FieldLabel>
          </Field>
          <Field orientation={'horizontal'}>
            <Checkbox id="marketingTerm" />
            <FieldLabel htmlFor="marketingTerm">
              <span className="text-xs">마케팅 정보 수신동의(선택)</span>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldGroup>

      <Button type="submit" className="mt-9">
        Submit
      </Button>
    </form>
  );
};

export default SignUpForm;
