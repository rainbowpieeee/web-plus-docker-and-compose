import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserHelper {
  getUserIdOutRequest(request: Request) {
    let userId: number;
    for (const key in request.user) {
      if (key === 'userId') {
        userId = request.user[key];
        return userId;
      }
    }
  }
}
