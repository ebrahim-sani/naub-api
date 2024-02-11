/*
  Warnings:

  - You are about to drop the column `address` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `bloodGroup` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `genotype` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `hairColor` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `isStudent` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `lga` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `modeOfEntry` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `nextOfKinAddress` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `nextOfKinFirstName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `nextOfKinLastName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `nextOfKinPhoneNumber` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `nextOfKinRelationship` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `otherName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `programme` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `town` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `tribalMark` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `tribe` on the `student` table. All the data in the column will be lost.
  - Added the required column `rToken` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "registerCourse" DROP CONSTRAINT "registerCourse_studentId_fkey";

-- DropIndex
DROP INDEX "student_email_key";

-- DropIndex
DROP INDEX "student_matricNumber_idx";

-- DropIndex
DROP INDEX "student_phoneNumber_key";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "address",
DROP COLUMN "bloodGroup",
DROP COLUMN "country",
DROP COLUMN "dateOfBirth",
DROP COLUMN "department",
DROP COLUMN "email",
DROP COLUMN "faculty",
DROP COLUMN "gender",
DROP COLUMN "genotype",
DROP COLUMN "hairColor",
DROP COLUMN "isStudent",
DROP COLUMN "level",
DROP COLUMN "lga",
DROP COLUMN "maritalStatus",
DROP COLUMN "modeOfEntry",
DROP COLUMN "nextOfKinAddress",
DROP COLUMN "nextOfKinFirstName",
DROP COLUMN "nextOfKinLastName",
DROP COLUMN "nextOfKinPhoneNumber",
DROP COLUMN "nextOfKinRelationship",
DROP COLUMN "otherName",
DROP COLUMN "password",
DROP COLUMN "phoneNumber",
DROP COLUMN "profilePicture",
DROP COLUMN "programme",
DROP COLUMN "religion",
DROP COLUMN "role",
DROP COLUMN "state",
DROP COLUMN "town",
DROP COLUMN "tribalMark",
DROP COLUMN "tribe",
ADD COLUMN     "rToken" TEXT NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
