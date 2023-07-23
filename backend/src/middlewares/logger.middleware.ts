import { NestMiddleware, Injectable, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppHTTPLogger implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      this.logger.info(
        `${new Date().toISOString()}. Request: ${method} ${originalUrl}. Response: ${statusCode} ${
          statusMessage ? statusMessage : ''
        }.${statusCode >= 400 ? ' Body of request: ' : ''}`,
      );
      if (statusCode >= 400) {
        this.logger.info(req.body);
      }
    });
    next();
  }
}
