import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import responsify from 'utils/responsify';
import { LectureDto } from './lecture.dto';

@Injectable()
export class LectureService {
  constructor(private prisma: PrismaService) {}

  async getAllLectures() {
    try {
      const result = await this.prisma.lecture.findMany({});
      return responsify.getSuccess('000', 'Found Lectures', result);
    } catch (error) {
      return responsify.getSuccess('001', 'Error Finding Lectures', error);
    }
  }

  async getSingleLecture(l_id: string) {
    console.log(l_id);
    try {
      const result = await this.prisma.lecture.findFirst({
        where: {
          lectureId: l_id,
        },
      });
      if (result) {
        return responsify.getSuccess('000', 'Lecture found', result);
      } else {
        return responsify.getError('011', 'Unable to get lecture', {});
      }
    } catch (error) {
      return responsify.getError('001', 'Error finding single lecture', error);
    }
  }

  async createALecture(dto: LectureDto) {
    try {
      const result = await this.prisma.lecture.create({
        data: dto,
      });
      return responsify.getError('000', 'Lecture Created', result);
    } catch (error) {
      return responsify.getError('001', 'Error finding lecture', error);
    }
  }

  async deleteALecture(l_id: string) {
    try {
      const result = await this.prisma.lecture.delete({
        where: {
          lectureId: l_id,
        },
      });
      return responsify.getError('000', 'Lecture Deleted', result);
    } catch (error) {
      return responsify.getError('001', 'Error deleting a lecture', error);
    }
  }
}
