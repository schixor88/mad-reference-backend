-- DropForeignKey
ALTER TABLE "Absent" DROP CONSTRAINT "Absent_lectureLectureId_fkey";

-- DropForeignKey
ALTER TABLE "Absent" DROP CONSTRAINT "Absent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Present" DROP CONSTRAINT "Present_lectureLectureId_fkey";

-- DropForeignKey
ALTER TABLE "Present" DROP CONSTRAINT "Present_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Present" ADD CONSTRAINT "Present_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Present" ADD CONSTRAINT "Present_lectureLectureId_fkey" FOREIGN KEY ("lectureLectureId") REFERENCES "Lecture"("lectureId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absent" ADD CONSTRAINT "Absent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absent" ADD CONSTRAINT "Absent_lectureLectureId_fkey" FOREIGN KEY ("lectureLectureId") REFERENCES "Lecture"("lectureId") ON DELETE CASCADE ON UPDATE CASCADE;
