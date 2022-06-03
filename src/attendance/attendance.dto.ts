import { IsDefined } from 'class-validator';

export class AttendanceDto {
  @IsDefined()
  student_id: string;
  @IsDefined()
  lecture_id: string;
}
