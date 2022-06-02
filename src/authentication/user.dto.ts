import { IsDefined, IsString } from 'class-validator';

export class User {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsString()
  access: string;
}
