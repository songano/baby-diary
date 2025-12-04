/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "baby_relation" AS ENUM ('MOTHER', 'FATHER', 'GRANDMOTHER_PATERNAL', 'GRANDFATHER_PATERNAL', 'GRANDMOTHER_MATERNAL', 'GRANDFATHER_MATERNAL', 'AUNT_MATERNAL', 'AUNT_PATERNAL', 'UNCLE', 'GUARDIAN', 'OTHER');

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "babyRelation" "baby_relation" NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
