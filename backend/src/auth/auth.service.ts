import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ServerError } from '../errors/errors';
import { UserHash } from 'src/users/helpers/hash.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userHasch: UserHash,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ username });
    if (user) {
      const { password: hashPassword, ...restUser } = user;
      const isPasportValid = await this.userHasch.validatePassword(
        password,
        hashPassword,
      );
      if (isPasportValid) {
        return restUser;
      }
    }
    return null;
  }

  async signin(userName: string, userId: number) {
    const payload = { userName, userId };
    let token: string;
    try {
      token = this.jwtService.sign(payload);
    } catch {
      throw new ServerError('Ошибка сервера при авторизации. Попробуйте снова');
    }
    return {
      access_token: token,
    };
  }
}
