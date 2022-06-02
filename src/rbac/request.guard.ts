import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './enum/role.enum';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './request.decorator';
import responsify from 'utils/responsify';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService, private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return super.canActivate(context);
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return super.canActivate(context);
    }

    const token = request.headers['authorization'].split(' ')[1];
    console.log(`Token : ${token}`);

    const decodedToken = this.jwtService.decode(token) as any;
    console.log(decodedToken);
    const tokenRole = decodedToken.access;
    console.log('user access is ', tokenRole);
    console.log('required role is ', requiredRoles);
    requiredRoles.forEach((role) => {
      if (role.toLowerCase !== tokenRole.toLowerCase) {
        throw new UnauthorizedException(
          responsify.getError('001', 'Authentication Error', {}),
        );
      }
    });
    return super.canActivate(context);
  }
}
