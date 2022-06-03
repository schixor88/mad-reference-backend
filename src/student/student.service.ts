import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import responsify from 'utils/responsify';
import { Student } from './student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getAllStudents() {
    try {
      const result = await this.prisma.student.findMany();
      return responsify.getSuccess('000', 'Found students', result);
    } catch (error) {
      return responsify.getError('001', 'Error getting students', error);
    }
  }

  async getStudentById(s_id: string) {
    try {
      const result = await this.prisma.student.findFirst({
        where: {
          id: s_id,
        },
      });
      if (result) {
        return responsify.getSuccess('000', 'Student found', result);
      } else {
        return responsify.getError('011', 'Unable to get student', {});
      }
    } catch (error) {
      return responsify.getError('001', 'Error getting student', error);
    }
  }

  async createStudent(dto: Student) {
    console.log(dto);
    try {
      const result = await this.prisma.student.create({
        data: {
          id: dto.id,
          fullname: dto.fullname,
          section: dto.section,
          faculty: dto.faculty,
        },
      });
      if (result) {
        return responsify.getSuccess('000', 'Student Created', result);
      } else {
        return responsify.getError('011', 'Unable to create student', result);
      }
    } catch (error) {
      return responsify.getError('001', 'Error creating student', error);
    }
  }

  async deleteSingleStudent(s_id: string) {
    try {
      const result = await this.prisma.student.delete({
        where: {
          id: s_id,
        },
      });
      return responsify.getSuccess('000', 'Deleted Student!', result);
    } catch (error) {
      return responsify.getError('001', 'Error deleting student', error);
    }
  }

  async deleteStudents() {
    try {
      const result = await this.prisma.student.deleteMany({});
      return responsify.getSuccess('000', 'Deleted Successfully', result);
    } catch (error) {
      return responsify.getError('001', 'Error delete students', error);
    }
  }
}
