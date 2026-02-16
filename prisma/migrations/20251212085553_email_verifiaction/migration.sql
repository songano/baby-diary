-- CreateEnum
CREATE TYPE "EmailVerificationType" AS ENUM ('SIGN_UP', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "EmailVerification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "EmailVerificationType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailVerification_email_type_idx" ON "EmailVerification"("email", "type");

-- CreateIndex
CREATE INDEX "EmailVerification_email_code_type_idx" ON "EmailVerification"("email", "code", "type");
