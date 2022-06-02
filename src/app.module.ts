import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserDetailsModule } from './user-details/userdetails.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserDetailsModule,
  ],
})
export class AppModule {}
