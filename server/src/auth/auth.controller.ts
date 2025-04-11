import { Controller, HttpStatus, HttpCode, Body, Post } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async SignIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.register(createUserDto);
  }
}
