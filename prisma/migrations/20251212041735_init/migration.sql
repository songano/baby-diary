-- CreateEnum
CREATE TYPE "BabyRelation" AS ENUM ('MOTHER', 'FATHER', 'GRANDMOTHER_PATERNAL', 'GRANDFATHER_PATERNAL', 'GRANDMOTHER_MATERNAL', 'GRANDFATHER_MATERNAL', 'AUNT_MATERNAL', 'AUNT_PATERNAL', 'UNCLE', 'GUARDIAN', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "babyRelation" "BabyRelation" NOT NULL,
    "termsAgreed" BOOLEAN NOT NULL,
    "privacyAgreed" BOOLEAN NOT NULL,
    "marketingAgreed" BOOLEAN NOT NULL DEFAULT false,
    "termsAgreeAt" TIMESTAMP(3),
    "privacyAgreeAt" TIMESTAMP(3),
    "marketingAgreeAt" TIMESTAMP(3),
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
