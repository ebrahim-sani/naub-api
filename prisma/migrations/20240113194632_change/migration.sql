/*
  Warnings:

  - Added the required column `hash` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "hash" TEXT NOT NULL,
ALTER COLUMN "rToken" DROP NOT NULL;
