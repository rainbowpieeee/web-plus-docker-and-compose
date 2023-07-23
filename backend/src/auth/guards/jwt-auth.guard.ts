import {
  Injectable,
  ExecutionContext,
  CanActivate,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

// создание декоратора для объявления роутов, доступных без авторизации
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// защитник, обеспечивающий посещение роутов только авторизованными пользователями
// он должен стать глобальным
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // проверка на предмет того, объявлен ли конкретный роут как публичный
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // если проверка роута на публичность была негативной, верифицируем токен, декодируем его,
    // получаем username и id пользователя и добавляем эту информацию к объекту запроса
    const request = context.switchToHttp().getRequest<Request>();
    const { authorization: authorizationHeader } = request.headers;
    if (!authorizationHeader || !authorizationHeader.includes('Bearer ')) {
      return false;
    }
    const token = authorizationHeader.split(' ')[1];
    const user = this.jwtService.decode(token);
    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
