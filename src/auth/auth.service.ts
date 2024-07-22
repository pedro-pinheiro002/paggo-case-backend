import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';

@Injectable()
export class AuthService {
  private readonly oAuth2Client = new OAuth2Client(
    this.configService.get('GOOGLE_CLIENT_ID'),
    this.configService.get('GOOGLE_CLIENT_SECRET'),
    'postmessage',
  );

  constructor(private readonly configService: ConfigService) {}

  async getTokens(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    return tokens;
  }

  async getRefreshedTokens(refreshToken: string) {
    const userRefreshClient = new UserRefreshClient(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      refreshToken,
    );
    const { credentials } = await userRefreshClient.refreshAccessToken();
    return credentials;
  }
}
