import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAuthConfig } from 'src/config/auth.config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from './entities/blacklistedToken.entity';
import { AllegroAuthService } from './allegro-auth.service';
import { AllegroAuthController } from './allegro-auth.controller';
import { AllegroToken } from './entities/allegro-token.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    HttpModule,
    PassportModule,
    TypeOrmModule.forFeature([BlacklistedToken, AllegroToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getAuthConfig,
    }),
  ],
  controllers: [AuthController, AllegroAuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    AllegroAuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
