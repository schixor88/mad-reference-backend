import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
