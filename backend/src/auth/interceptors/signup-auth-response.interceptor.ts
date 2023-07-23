import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SignupResponseDto } from '../dto/signup-response.dto';

@Injectable()
export class SignupAuthResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        ({
          id,
          username,
          about,
          avatar,
          email,
          createdAt,
          updatedAt,
        }: SignupResponseDto) => ({
          id,
          username,
          about,
          avatar,
          email,
          createdAt,
          updatedAt,
        }),
      ),
    );
  }
}
