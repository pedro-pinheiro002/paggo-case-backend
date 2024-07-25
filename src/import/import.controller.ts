import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ImportBody } from 'src/dtos/import-body.dto';
import { ImportService } from './import.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReqWithUser } from 'src/dtos/req.dto';

@Controller()
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @UseGuards(AuthGuard)
  @Post('import')
  async importText(@Body() body: ImportBody) {
    const { objectKey } = body;
    const response = await this.importService.importText(
      objectKey.split('.')[0],
    );
    return response;
  }

  @UseGuards(AuthGuard)
  @Get('import/last')
  async importLastText(@Req() req: ReqWithUser) {
    const { sub: userId } = req.user;
    const response = await this.importService.importLastText(userId);
    return response;
  }
}
