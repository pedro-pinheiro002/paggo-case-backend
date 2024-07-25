import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { S3Service } from 'src/database/s3.service';

@Injectable()
export class ImportService {
  constructor(private readonly s3Service: S3Service, private readonly prisma: PrismaService) {
  }
  
  async importText(objectKey: string) {
    const response = await this.s3Service.s3Client.send(
      new GetObjectCommand({
        Bucket: 'paggo-case-bucket',
        Key: 'texts/'.concat(objectKey),
      }),
    );
    return response.Body.transformToString();
  }
  async importLastText(userId: string) {
    const file = await this.prisma.textExtracted.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!file) {
      return '';
    }
    return this.importText(file.key.split('.')[0]);

  }
}
