import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TextractService } from './textract.service';
import { ExtractTextBody } from 'src/dtos/extract-text-body.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReqWithUser } from 'src/dtos/req.dto';

@Controller()
export class TextractController {
  constructor(private readonly textractService: TextractService) {}

  @UseGuards(AuthGuard)
  @Post('extract_text')
  async extractText(@Req() req: ReqWithUser, @Body() body: ExtractTextBody) {
    const { sub: userId } = req.user;
    const { objectKey } = body;
    const response = await this.textractService.analyzeDocument(objectKey, userId);
    return response;
  }
}
