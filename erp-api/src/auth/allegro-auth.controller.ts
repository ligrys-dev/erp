import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';
import { AllegroAuthService } from './allegro-auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('/auth/allegro')
export class AllegroAuthController {
  constructor(private allegroAuthService: AllegroAuthService) {}

  @Get('/')
  @Redirect()
  getAuthorizationCode() {
    return { url: this.allegroAuthService.getAuthorizationCode() };
  }

  @Get('/callback')
  handleCallback(@Query('code') code: string) {
    return this.allegroAuthService.getAccesToken(code);
  }

  @Get('/test')
  test() {
    console.log(this.allegroAuthService.getAuthorizationCode());
    return this.allegroAuthService.test();
  }
}
