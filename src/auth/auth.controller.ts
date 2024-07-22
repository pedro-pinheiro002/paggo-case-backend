import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetTokensBody } from 'src/dtos/get-tokens-body.dto';
import { GetRefreshedTokensBody } from 'src/dtos/get-refreshed-tokens-body.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async getTokens(
    @Body() body: GetTokensBody,
  ) {
    const { code } = body;
    const response = await this.authService.getTokens(code);
    return response;
  }

  @Post('google/refresh-token')
  async getRefreshedTokens(@Body() body: GetRefreshedTokensBody) {
    const { refreshToken } = body;
    const response = await this.authService.getRefreshedTokens(refreshToken);
    return response;
  }
}
