/*
  Warnings:

  - You are about to drop the column `specialId` on the `CourseRegisteration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `CourseRegisteration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `CourseRegisteration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CourseRegisteration_specialId_key";

-- AlterTable
ALTER TABLE "CourseRegisteration" DROP COLUMN "specialId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseRegisteration_courseId_key" ON "CourseRegisteration"("courseId");

-- AddForeignKey
ALTER TABLE "registerCourse" ADD CONSTRAINT "registerCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
