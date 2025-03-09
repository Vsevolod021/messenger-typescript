import { Controller, HttpStatus, HttpCode, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { Public } from './decorators/public.decorator';

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
}
