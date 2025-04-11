import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findOne(login);

      if (user?.password !== password) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user._id, login: user.login };

      return { access_token: await this.jwtService.signAsync(payload) };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const login = createUserDto.login;
    const payloadLoginUser = await this.usersService.findOne(login);

    if (payloadLoginUser) {
      const responseBody = {
        status: HttpStatus.BAD_REQUEST,
        error: 'Registration failed',
        message: 'this login already exists',
      };

      throw new HttpException(responseBody, HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.create(createUserDto);

    const payload = { sub: user._id, login: user.login };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
