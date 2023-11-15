import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
    super();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean> | any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const isTokenBlacklisted = await this.authService.isTokenBlacklisted(token);
    await this.authService.removeExpiredTokens();

    if (isTokenBlacklisted) return false;

    return super.canActivate(context);
  }
}
