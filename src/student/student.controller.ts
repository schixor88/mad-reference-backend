import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Student } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  async getAllStudent(): Promise<any> {
    var response = await this.studentService.getAllStudents();
    return response;
  }

  @Get('/:id')
  async getStudentDetails(@Param('id') id: string): Promise<any> {
    var response = await this.studentService.getStudentById(id);
    return response;
  }

  @Post('/')
  async createStudent(@Body() dto: Student): Promise<any> {
    console.log(dto);
    var response = await this.studentService.createStudent(dto);
    return response;
  }
}