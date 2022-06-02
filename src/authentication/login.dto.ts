import { IsDefined, IsString } from 'class-validator';

export class Login {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
