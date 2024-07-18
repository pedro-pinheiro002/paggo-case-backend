import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/database/prisma.service';
import { S3Service } from 'src/database/s3.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, PrismaService, S3Service],
})
export class UploadModule {}
