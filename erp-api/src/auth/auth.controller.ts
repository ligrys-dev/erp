import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SaveUserEntity } from 'src/types';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.setToken(req.user as SaveUserEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh-token')
  async refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  async test(@Req() req: Request) {
    return this.authService.testMethod();
  }
}
