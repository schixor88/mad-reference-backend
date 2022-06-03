/*
  Warnings:

  - The primary key for the `Lecture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Absent" DROP CONSTRAINT "Absent_lectureLectureId_fkey";

-- DropForeignKey
ALTER TABLE "Present" DROP CONSTRAINT "Present_lectureLectureId_fkey";

-- AlterTable
ALTER TABLE "Absent" ALTER COLUMN "lectureLectureId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_pkey",
ALTER COLUMN "lectureId" DROP DEFAULT,
ALTER COLUMN "lectureId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lecture_pkey" PRIMARY KEY ("lectureId");
DROP SEQUENCE "Lecture_lectureId_seq";

-- AlterTable
ALTER TABLE "Present" ALTER COLUMN "lectureLectureId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Present" ADD CONSTRAINT "Present_lectureLectureId_fkey" FOREIGN KEY ("lectureLectureId") REFERENCES "Lecture"("lectureId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absent" ADD CONSTRAINT "Absent_lectureLectureId_fkey" FOREIGN KEY ("lectureLectureId") REFERENCES "Lecture"("lectureId") ON DELETE CASCADE ON UPDATE CASCADE;
