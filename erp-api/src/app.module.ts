import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllegroModule } from './modules/allegro/allegro.module';
import { ClientModule } from './modules/client/client.module';
import { FirmModule } from './modules/firm/firm.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { StockModule } from './modules/stock/stock.module';
import { getRedisConfig } from './config/redis.config';
import { RedisCacheModule } from './common/cache/redis-cache.module';

@Module({
  imports: [
    DatabaseModule,
    RedisCacheModule,
    AuthModule,
    UsersModule,
    AllegroModule,
    ClientModule,
    StockModule,
    InvoiceModule,
    FirmModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // XXX uncomment to global jwt auth
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
