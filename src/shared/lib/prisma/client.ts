import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/generated/prisma/client';

console.log('DB URL:', process.env.DATABASE_URL);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

// 개발환경에서만 글로벌 객체에 PrismaClient 인스턴스 할당
// 개발환경에서 서버가 리로드될 때마다 새로운 PrismaClient 인스턴스가 생성되는 것 방지
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
