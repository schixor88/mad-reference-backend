import { Body, Controller, Post } from '@nestjs/common';
import { AttendanceDto } from './attendance.dto';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceSerivce: AttendanceService) {}

  @Post('/present')
  async createPresenRecord(@Body() dto: AttendanceDto): Promise<any> {
    var result = this.attendanceSerivce.createPresentRecordFor(dto);
    return result;
  }

  @Post('/absent')
  async createAbsentRecord(@Body() dto: AttendanceDto): Promise<any> {
    var result = this.attendanceSerivce.createAbsentRecordFor(dto);
    return result;
  }
}
