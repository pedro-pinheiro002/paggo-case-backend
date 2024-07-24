/*
  Warnings:

  - Added the required column `familyName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "familyName" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL;
