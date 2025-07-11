import {
  Controller,
  HttpStatus,
  HttpCode,
  Headers,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { CreateUserDto } from 'src/modules/user/user.dto';
import { Public } from './decorators/public.decorator';
import { ProfileDto, SignInDto } from './auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Логин' })
  async SignIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Регистрация' })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @ApiOperation({ summary: 'Профиль' })
  async getUserId(
    @Headers('authorization') authorization: string,
  ): Promise<ProfileDto> {
    const token = authorization.replace('Bearer ', '');

    return await this.authService.getUserDataFromToken(token);
  }
}
