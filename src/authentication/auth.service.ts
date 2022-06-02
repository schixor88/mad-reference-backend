import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
import { format } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import responsify from 'utils/responsify';
import { Login } from './login.dto';
import { User } from './user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async registerUser(dto: User): Promise<any> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const result = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hashedPassword,
          access: dto.access,
        },
      });
      const data = {
        username: result.username,
        access: result.access,
      };
      return responsify.getSuccess('000', 'User Registered Successfully', data);
    } catch (error) {
      return responsify.getError('001', 'Unauthorized', error);
    }
  }

  async loginUser(dto: Login): Promise<any> {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      if (result) {
        if (await bcrypt.compare(dto.password, result.password)) {
          const signedToken = this.jwtService.sign({
            id: result.id,
            access: result.access,
          });
          const decodeToken = this.jwtService.decode(signedToken) as any;
          const expiryTime = decodeToken.exp;
          return responsify.getSuccess('000', 'Login Successful', {
            accessToken: signedToken,
            expiryTime: expiryTime,
          });
        }
      }
    } catch (error) {
      return responsify.getError('001', 'Invalid User', error);
    }
  }
}
