import { prisma } from '@/shared/lib/prisma/client';

export class AuthRepository {
  async findByNickname(nickname: string) {
    return prisma.user.findUnique({
      where: { nickname: nickname.toLowerCase() },
      select: { id: true },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const user = await this.findByNickname(nickname);
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}

// 싱글톤 인스턴스 (NestJS 전환 전까지 사용)
export const authRepository = new AuthRepository();
