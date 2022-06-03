import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import responsify from 'utils/responsify';
import { AttendanceDto } from './attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async createPresentRecordFor(dto: AttendanceDto) {
    console.log(dto);
    try {
      const isPresent = await this.prisma.present.findFirst({
        where: {
          studentId: dto.student_id,
          lectureLectureId: dto.lecture_id,
        },
      });

      if (isPresent) {
        return responsify.getError(
          '012',
          'Student is alredy present for the lecture',
          isPresent,
        );
      }

      const hasAbsent = await this.prisma.absent.findFirst({
        where: {
          studentId: dto.student_id,
          lectureLectureId: dto.lecture_id,
        },
      });

      if (hasAbsent) {
        const removeAbsent = await this.prisma.present.delete({
          where: {
            presentId: hasAbsent.absentId,
          },
        });

        console.log('Removed Absent matching data', removeAbsent);
      }

      const result = await this.prisma.present.create({
        data: {
          student: {
            connect: {
              id: dto.student_id,
            },
          },
          lecture: {
            connect: {
              lectureId: dto.lecture_id,
            },
          },
        },
      });
      return responsify.getSuccess(
        '000',
        'Student Attendance as Present',
        result,
      );
    } catch (error) {
      return responsify.getError('001', 'Error adding attendance', error);
    }
  }

  async createAbsentRecordFor(dto: AttendanceDto) {
    console.log(dto);
    try {
      const hasPresent = await this.prisma.present.findFirst({
        where: {
          studentId: dto.student_id,
          lectureLectureId: dto.lecture_id,
        },
      });

      if (hasPresent) {
        const removePresent = await this.prisma.present.delete({
          where: {
            presentId: hasPresent.presentId,
          },
        });

        console.log('Removed Present matching data', removePresent);
      }

      const result = await this.prisma.absent.create({
        data: {
          student: {
            connect: {
              id: dto.student_id,
            },
          },
          lecture: {
            connect: {
              lectureId: dto.lecture_id,
            },
          },
        },
      });
      console.log(result);
      return responsify.getSuccess(
        '000',
        'Student Attendance as Absent',
        result,
      );
    } catch (error) {
      return responsify.getError('001', 'Error adding attendance', error);
    }
  }
}
