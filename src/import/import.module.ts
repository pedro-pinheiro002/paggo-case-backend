import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { S3Service } from 'src/database/s3.service';

@Module({
  imports: [],
  controllers: [ImportController],
  providers: [ImportService, S3Service],
})
export class ImportModule {}
