import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
