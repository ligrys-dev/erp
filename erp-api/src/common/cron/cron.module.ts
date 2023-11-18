import { Inject, Module } from '@nestjs/common';
import { Interval, ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Interval(30 * 60 * 1000)
  async refreshExpiredTokensCache() {
    await this.cacheManager.del('expired-tokens');
  }
}
