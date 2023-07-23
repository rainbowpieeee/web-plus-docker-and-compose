import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Wishlist } from '../entities/wischlist.entity';

@Injectable()
export class RestrictionUserInfoWishlistInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((wishlist: Wishlist) => {
        const { email, password, ...restOwner } = wishlist.owner;
        return { ...wishlist, owner: restOwner };
      }),
    );
  }
}
