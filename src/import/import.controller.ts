import { Body, Controller, Post } from '@nestjs/common';
import { ImportBody } from 'src/dtos/import-body.dto';
import { ImportService } from './import.service';

@Controller()
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('import')
  async importText(@Body() body: ImportBody) {
    const { objectKey } = body;
    const response = await this.importService.importText(
      objectKey.split('.')[0],
    );
    return response;
  }
}
