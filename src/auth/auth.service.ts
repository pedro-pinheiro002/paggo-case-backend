import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { jwtDecode } from 'jwt-decode';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/types/User';

@Injectable()
export class AuthService {
  private readonly oAuth2Client = new OAuth2Client(
    this.configService.get('GOOGLE_CLIENT_ID'),
    this.configService.get('GOOGLE_CLIENT_SECRET'),
    'postmessage',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getTokens(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    const { id_token } = tokens;
    const userData: User = jwtDecode(id_token);
    let user = await this.prisma.user.findUnique({
      where: { id: userData.sub, email: userData.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: userData.sub,
          name: userData.given_name,
          familyName: userData.family_name,
          profilePicture: userData.picture,
          emailVerified: userData.email_verified,
          email: userData.email,
        },
      });
    }
    return { tokens, user };
  }

  async getRefreshedTokens(refreshToken: string) {
    const userRefreshClient = new UserRefreshClient(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      refreshToken,
    );
    const { credentials: tokens } = await userRefreshClient.refreshAccessToken();
    const userData: User = jwtDecode(tokens.id_token);
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });
    return { tokens, user };
  }
}
