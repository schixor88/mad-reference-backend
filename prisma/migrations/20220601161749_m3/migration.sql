/*
  Warnings:

  - Added the required column `lectureLectureId` to the `Absent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureLectureId` to the `Present` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absent" ADD COLUMN     "lectureLectureId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Present" ADD COLUMN     "lectureLectureId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Lecture" (
    "lectureId" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("lectureId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_lectureId_key" ON "Lecture"("lectureId");

-- AddForeignKey
ALTER TABLE "Present" ADD CONSTRAINT "Present_lectureLectureId_fkey" FOREIGN KEY ("lectureLectureId") REFERENCES "Lecture"("lectureId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absent" ADD CONSTRAINT "Absent_lectureLectureId_fkey" FOREIGN KEY ("lectureLectureId") REFERENCES "Lecture"("lectureId") ON DELETE RESTRICT ON UPDATE CASCADE;
