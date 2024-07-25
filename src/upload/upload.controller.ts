import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadBody } from 'src/dtos/upload-body.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReqWithUser } from 'src/dtos/req.dto';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  async uploadFile(@Req() req: ReqWithUser, @Body() body: UploadBody) {
    const { sub: userId } = req.user;
    const { name, contentType } = body;
    const response = await this.uploadService.getSignedUrl(
      name,
      contentType,
      userId,
    );
    return response;
  }
}
