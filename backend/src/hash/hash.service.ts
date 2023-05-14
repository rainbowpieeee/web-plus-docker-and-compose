import { compare, genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
