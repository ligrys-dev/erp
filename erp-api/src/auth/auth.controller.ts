import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SaveUserInterface } from 'src/common/types';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/allegro')
  loginToAllegro() {
    return this.authService.signInIntoAllegro();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as SaveUserInterface);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  async test(@Req() req: Request) {
    return req.user;
  }
}
