import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AllegroToken } from './entities/allegro-token.entity';
import { assignProperties } from 'src/utils/assign-properties';

@Injectable()
export class AllegroAuthService {
  private readonly CLIENT_ID: string =
    this.configService.get('ALLEGRO_CLIENT_ID');

  private readonly CLIENT_SECRET: string = this.configService.get(
    'ALLEGRO_CLIENT_SECRET',
  );

  private readonly REDIRECT_URI: string = this.configService.get(
    'ALLEGRO_REDIRECT_URI',
  );

  private readonly AUTH_URL: string =
    this.configService.get('ALLEGRO_AUTH_URL');

  private readonly TOKEN_URL: string =
    this.configService.get('ALLEGRO_TOKEN_URL');

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async test() {
    return {
      CLIENT_ID: this.CLIENT_ID,
      CLIENT_SECRET: this.CLIENT_SECRET,
      REDIRECT_URI: this.REDIRECT_URI,
      AUTH_URL: this.AUTH_URL,
      TOKEN_URL: this.TOKEN_URL,
    };
  }

  getAuthorizationCode() {
    return `${this.AUTH_URL}?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}`;
  }

  async getAccesToken(code: string) {
    console.log({ code });
    const authorizationHeader = Buffer.from(
      `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
    ).toString('base64');

    const headers = {
      Authorization: `Basic ${authorizationHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const content = `grant_type=authorization_code&code=${encodeURIComponent(
      code,
    )}&redirect_uri=${this.REDIRECT_URI}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.TOKEN_URL, content, {
          headers,
        }),
      );

      const allegroToken = new AllegroToken();
      assignProperties(allegroToken, response.data);
      await allegroToken.save();

      const { access_token } = response.data;
      return { access_token };
    } catch (error) {
      console.error(
        `Something went wrong: ${error.response.status} ${JSON.stringify(
          error.response.data,
        )}`,
      );
      throw new Error('Failed to retrieve access token');
    }
  }

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
}
