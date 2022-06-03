import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
  providers: [LectureService],
  controllers: [LectureController],
})
export class LectureModule {}
