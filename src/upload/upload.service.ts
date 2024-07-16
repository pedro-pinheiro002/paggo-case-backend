import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

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
