import { IsDefined, IsString } from 'class-validator';

export class Student {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  fullname: string;

  @IsDefined()
  @IsString()
  faculty: string;

  @IsDefined()
  @IsString()
  section: string;
}
