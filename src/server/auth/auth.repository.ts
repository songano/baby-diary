import { createClient } from '@/shared/lib/supabase/server';

export class AuthRepository {
  // 닉네임 찾기
  async findByNickname(nickname: string) {
    const supabase = await createClient();
    const { data } = await supabase.from('users').select('id').eq('nickname', nickname.toLowerCase()).maybeSingle();

    return data;
  }

  // 이메일 찾기
  async findByEmail(email: string) {
    const supabase = await createClient();
    const { data } = await supabase.from('users').select('id').eq('email', email.toLowerCase()).maybeSingle();

    return data;
  }

  // 닉네임 중복 체크
  async existsByNickname(nickname: string): Promise<boolean> {
    const user = await this.findByNickname(nickname);
    return !!user;
  }

  // 이메일 중복 체크
  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }

  // 이메일 인증 생성
  async createEmailVerification(email: string, code: string, type: string, expiresAt: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('email_verifications')
      .insert({
        email,
        code,
        type,
        expiresAt,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data;
  }

  // 이메일 인증 찾기
  async findEmailVerification(email: string, code: string, type: string) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('email_verifications')
      .select('id, expires_at, verified')
      .eq('email', email.toLowerCase())
      .eq('code', code)
      .eq('type', type)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    return data;
  }

  // 이메일 인증 마크
  async markEmailVerified(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('email_verifications').update({ verified: true }).eq('id', id);

    if (error) return error;
  }

  // 이메일 인증 카운트
  async countEmailVerification(email: string): Promise<number> {
    const supabase = await createClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
      .from('email_verifications')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .eq('type', 'SIGN_UP')
      .gte('created_at', todayStart.toISOString());

    if (error) throw error;
    return count ?? 0;
  }
}
// 싱글톤 인스턴스 (NestJS 전환 전까지 사용)
export const authRepository = new AuthRepository();
