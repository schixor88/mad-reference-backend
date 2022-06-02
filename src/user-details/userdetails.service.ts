import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import responsify from 'utils/responsify';

@Injectable()
export class UserDetailsService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async getAllUsers(): Promise<any> {
    try {
      const result = await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          access: true,
        },
      });

      if (result) {
        return responsify.getSuccess('000', 'Users found', result);
      } else {
        return responsify.getError('000', 'No users found', result);
      }
    } catch (error) {
      return responsify.getError('001', 'Unable to get users', error);
    }
  }

  async getUserDetails(userId: string): Promise<any> {
    try {
      const result = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          username: true,
          id: true,
        },
      });
      if (result) {
        return responsify.getSuccess('000', 'User Found', result);
      } else {
        return responsify.getError('001', 'Single Not Found', null);
      }
    } catch (error) {
      return responsify.getError(
        '001',
        'Could not process the given user id',
        error,
      );
    }
  }
}
