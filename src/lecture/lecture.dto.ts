import { IsDefined, IsString } from 'class-validator';

export class LectureDto {
  @IsDefined()
  @IsString()
  lectureId: string;

  @IsDefined()
  @IsString()
  identifier: string;

  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string[];
}
