import { Body, Controller, Post } from '@nestjs/common';
import { TextractService } from './textract.service';
import { ExtractTextBody } from 'src/dtos/extract-text-body.dto';

@Controller()
export class TextractController {
  constructor(private readonly textractService: TextractService) {}

  @Post('extract_text')
  async extractText(@Body() body: ExtractTextBody) {
    const { objectKey } = body;
    const response = await this.textractService.analyzeDocument(objectKey);
    return response;
  }
}
