/*
  Warnings:

  - You are about to drop the `StudentAbsentRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentPresentRelation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentId` to the `Absent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Present` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentAbsentRelation" DROP CONSTRAINT "StudentAbsentRelation_absentAbsentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentAbsentRelation" DROP CONSTRAINT "StudentAbsentRelation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPresentRelation" DROP CONSTRAINT "StudentPresentRelation_presentPresentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPresentRelation" DROP CONSTRAINT "StudentPresentRelation_studentId_fkey";

-- AlterTable
ALTER TABLE "Absent" ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Present" ADD COLUMN     "studentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentAbsentRelation";

-- DropTable
DROP TABLE "StudentPresentRelation";

-- AddForeignKey
ALTER TABLE "Present" ADD CONSTRAINT "Present_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absent" ADD CONSTRAINT "Absent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
