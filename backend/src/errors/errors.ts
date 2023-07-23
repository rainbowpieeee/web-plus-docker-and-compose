import { HTTP_CODE_FORBIDDEN, HTTP_CODE_CONFLICT } from '../constants';

export class ServerError extends Error {
  constructor(messege: string) {
    super(messege);
    this.name = 'Sever Error';
  }
}

export class ForbiddenActionError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'Forbidden Action';
    this.statusCode = HTTP_CODE_FORBIDDEN;
  }
}

export class OfferError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'Offer Error';
    this.statusCode = statusCode;
  }
}

export class ReCopyingWish extends Error {
  statusCode: number;
  constructor() {
    super();
    this.name = 'Re-coping Wish';
    this.message = 'Вы уже имеете экземпляр такого желания.';
    this.statusCode = HTTP_CODE_CONFLICT;
  }
}

export class WishlistsError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'Wishlists Error';
    this.statusCode = statusCode;
  }
}
