import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LectureDto } from './lecture.dto';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Get()
  async getAllLecture(): Promise<any> {
    var result = this.lectureService.getAllLectures();
    return result;
  }

  @Get('single')
  async getSingleLecture(@Param() id: string): Promise<any> {
    var result = this.lectureService.getSingleLecture(id);
    return result;
  }

  @Post('/')
  async createSingleLecture(@Body() dto: LectureDto): Promise<any> {
    var result = this.lectureService.createALecture(dto);
    return result;
  }

  @Delete('/delete/:id')
  async deleteAllLecture(@Param() id: string): Promise<any> {
    var result = this.lectureService.deleteALecture(id);
    return result;
  }
}
