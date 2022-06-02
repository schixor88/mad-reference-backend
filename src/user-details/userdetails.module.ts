import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth.module';
import { UserDetailController } from './userdetails.controller';
import { UserDetailsService } from './userdetails.service';

@Module({
  providers: [UserDetailsService],
  controllers: [UserDetailController],
  imports: [AuthModule],
})
export class UserDetailsModule {}
