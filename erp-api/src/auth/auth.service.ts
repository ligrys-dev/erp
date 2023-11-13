import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/modules/users/users.service';
import { comparePwd } from 'src/utils/handle-pwd';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async logToAllegro(): Promise<{ access_token: string }> {
    const authHeader = `Basic ${Buffer.from(
      `${this.configService.get('ALLEGRO_CLIENT_ID')}
      :${this.configService.get('ALLEGRO_CLIENT_SECET')}`,
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
}
