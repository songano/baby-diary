/*
  Warnings:

  - You are about to drop the `EmailVerification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "email_verification_types" AS ENUM ('SIGN_UP', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "baby_relations" AS ENUM ('MOTHER', 'FATHER', 'GRANDMOTHER_PATERNAL', 'GRANDFATHER_PATERNAL', 'GRANDMOTHER_MATERNAL', 'GRANDFATHER_MATERNAL', 'AUNT_MATERNAL', 'AUNT_PATERNAL', 'UNCLE', 'GUARDIAN', 'OTHER');

-- DropTable
DROP TABLE "EmailVerification";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "BabyRelation";

-- DropEnum
DROP TYPE "EmailVerificationType";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "babyRelation" "baby_relations" NOT NULL,
    "termsAgreed" BOOLEAN NOT NULL,
    "privacyAgreed" BOOLEAN NOT NULL,
    "marketingAgreed" BOOLEAN NOT NULL DEFAULT false,
    "termsAgreeAt" TIMESTAMP(3),
    "privacyAgreeAt" TIMESTAMP(3),
    "marketingAgreeAt" TIMESTAMP(3),
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verifications" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "email_verification_types" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "email_verifications_email_type_idx" ON "email_verifications"("email", "type");

-- CreateIndex
CREATE INDEX "email_verifications_email_code_type_idx" ON "email_verifications"("email", "code", "type");
