import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export const getRedisConfig = async (configService: ConfigService) =>
  ({
    store: await redisStore({ ttl: 60 * 60 * 1000 }),
    host: configService.get('REDIS_HOST') || 'localhost',
    port: configService.get('REDIS_PORT') || 6379,
  }) as CacheModuleAsyncOptions;
