import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { S3Service } from 'src/database/s3.service';

@Injectable()
export class UploadService extends S3Service {
  constructor(private readonly prisma: PrismaService) {
    super(new ConfigService());
  }

  async getSignedUrl(fileName: string, contentType: string) {
    const fileKey = randomUUID().concat('-').concat(fileName);
    const signedUrl = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: 'paggo-case-bucket',
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 600 },
    );

    await this.prisma.file.create({
      data: {
        key: fileKey,
        name: fileName,
        contentType,
      },
    });

    return { signedUrl, key: fileKey };
  }
}
