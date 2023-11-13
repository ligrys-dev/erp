import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/modules/users/users.service';
import { comparePwd } from 'src/utils/handle-pwd';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SaveUserInterface } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signInIntoAllegro(): Promise<{ access_token: string }> {
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

    if (user && (await comparePwd(pwd, user.pwdHash))) {
      const { pwdHash, currentTokenId, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: SaveUserInterface) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
