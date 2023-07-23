import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ForbiddenActionError } from '../errors/errors';
import { EntityNotFoundError } from 'typeorm';
import { HTTP_CODE_FORBIDDEN } from '../constants';

@Catch(ForbiddenActionError)
export class UpdateWishErrorFilter implements ExceptionFilter {
  catch(exception: ForbiddenActionError, host: ArgumentsHost) {
    const { message, statusCode } = exception;
    const response = host.switchToHttp().getResponse();
    response.status(statusCode).json({ message });
  }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HTTP_CODE_FORBIDDEN).json({
      message:
        'Похоже, что Вы пробуете удалить чужое пожелание. Удалять желания может только создавший их пользователь.',
    });
  }
}
