import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadBody } from 'src/dtos/upload-body.dto';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  async uploadFile(@Body() body: UploadBody) {
    const { name, contentType } = body;
    const response = await this.uploadService.getSignedUrl(name, contentType);
    return response;
  }
}
