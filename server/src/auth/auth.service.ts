import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/users.dto';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from './auth.dto';
import * as jwt from 'jsonwebtoken';

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
    const user = await this.usersService.findOne(login);

    if (user?.password !== password) {
      const responseBody = {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Registration failed',
        message: 'Неверный логин или пароль',
      };

      throw new HttpException(responseBody, HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user._id, login: user.login };

    return { access_token: await this.jwtService.signAsync(payload) };
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
        message: 'Логин занят',
      };

      throw new HttpException(responseBody, HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.create(createUserDto);

    const payload = { sub: user._id, login: user.login };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async getUserDataFromToken(token: string): Promise<ProfileDto> {
    try {
      const decoded: string | jwt.JwtPayload = jwt.verify(
        token,
        jwtConstants.secret,
      );

      if (typeof decoded === 'string') {
        throw new Error('Unexpected string payload');
      }

      const profileinfo = await this.usersService.findOne(decoded.login);

      if (typeof profileinfo === 'undefined') {
        throw new Error('User not found!');
      }

      return {
        _id: profileinfo._id,
        surname: profileinfo.surname,
        login: profileinfo.login,
        photo: profileinfo.photo,
        name: profileinfo.name,
      };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Verifying failed',
          message: 'token does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
