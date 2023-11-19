import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Interval } from '@nestjs/schedule';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CronService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authService: AuthService,
  ) {}

  @Interval(30 * 60 * 1000)
  @CacheTTL(30 * 60 * 1000)
  async refreshExpiredTokensCache() {
    await this.cacheManager.del('expired-tokens');
    await this.authService.removeExpiredTokens();
    const tokens = await this.authService.getBlackListedTokens();
    await this.cacheManager.set('expired-tokens', tokens);
  }
}
