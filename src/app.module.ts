import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserDetailsModule } from './user-details/userdetails.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudentModule } from './student/student.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserDetailsModule,
    StudentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
      renderPath: '/',
    }),
  ],
})
export class AppModule {}
