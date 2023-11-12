import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { config } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async loginToAllegro(): Promise<{ access_token: string }> {
    const authorization = `Basic ${Buffer.from(
      `${config.allegro.clientId}:${config.allegro.clientSecret}`,
    ).toString('base64')}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          config.allegro.authUrl,
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: authorization,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      return { access_token: response.data.access_token };
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }
}
