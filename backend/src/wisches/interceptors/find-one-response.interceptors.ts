import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { FindOneDto } from '../dto/find-one.dto';

// из кода клиента в файле src/components/gift-page/gift-page.jsx из строки 145 следует, что
// клиент ожидает в числе данных их таблицы offers параметр name, которого нет в таблице базы данных.
// судя по коду ожидается имя пользователя, сделавшего offer. Получив эту информацию из связанной
// таблицы users, мы встраиваем ее в тело ответа так, как ожидает клиент
@Injectable()
export class FindOneResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: FindOneDto) => {
        const wishData: FindOneDto = {
          ...data,
          offers: data.offers.map((item) => {
            const offer = {
              createdAt: item.createdAt,
              amount: item.amount,
              name: item.user?.username,
            };
            return offer;
          }),
        };
        return wishData;
      }),
    );
  }
}
