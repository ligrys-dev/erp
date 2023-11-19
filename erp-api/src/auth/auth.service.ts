import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/modules/users/users.service';
import { comparePwd } from 'src/utils/handle-pwd';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SaveUserEntity } from 'src/types';
import { Request } from 'express';
import { BlacklistedToken } from './entities/blacklistedToken.entity';
import { LessThanOrEqual } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async loginIntoAllegro(): Promise<{ access_token: string }> {
    const authHeader = `Basic ${Buffer.from(
      `${this.configService.get('ALLEGRO_CLIENT_ID')}:${this.configService.get(
        'ALLEGRO_CLIENT_SECRET',
      )}`,
    ).toString('base64')}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.configService.get('ALLEGRO_AUTH_URL'),
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: authHeader,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      return { access_token: response.data.access_token };
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }

  async validateUser(usernameOrEmail: string, pwd: string) {
    const user =
      await this.usersService.findOneByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await comparePwd(pwd, user.pwdHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { pwdHash, ...result } = user;
    return result;
  }

  async setToken(user: SaveUserEntity) {
    const usr = await this.usersService.findOneById(user.id);

    if (!usr) {
      throw new UnauthorizedException('User not found');
    }

    const payload = {
      username: usr.username,
      sub: usr.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: this.configService.get('JWT_EXPIRATION_TIME'),
    };
  }

  async refreshToken(req: Request) {
    const oldToken = req.headers.authorization.split(' ')[1];
    const decodedToken = await this.jwtService.verifyAsync(oldToken, {
      secret: this.configService.get('JWT_SECRET'),
    });

    return await this.setToken(decodedToken);
  }

  async logout(req: Request) {
    const usedToken = req.headers.authorization.split(' ')[1];
    const key = 'expired-tokens';

    const blacklistedToken = new BlacklistedToken();
    blacklistedToken.token = usedToken;
    await blacklistedToken.save();

    const usedTokens: string[] = (await this.cacheManager.get(key)) || [];
    usedTokens.push(usedToken);
    this.cacheManager.set(key, usedTokens);

    await this.removeExpiredTokens();
    return { message: 'Succesfully logged out' };
  }

  async isTokenBlacklisted(token: string) {
    const blacklistedTokens: string[] =
      await this.cacheManager.get('expired-tokens');

    return !!blacklistedTokens.find((el) => el === token);
  }

  async removeExpiredTokens() {
    const tokens = await BlacklistedToken.find({
      where: {
        createdAt: LessThanOrEqual(new Date(Date.now() - 60 * 60 * 1000)),
      },
    });

    await BlacklistedToken.remove(tokens);
  }

  async getBlackListedTokens() {
    return await BlacklistedToken.find();
  }

  async testMethod() {
    return this.isTokenBlacklisted(
      '1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJkMDEzYTdmZS00NTllLTQ5YzYtYmE2ZS02MDJjNDBmNWYxZWYiLCJpYXQiOjE2OTk5NzkyMTR9.ZebJ6xePngyQ-PrmCNxnKqEKvEEJ6z-RKwb4L34kZH8',
    );
  }
}
