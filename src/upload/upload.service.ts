import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { S3Service } from 'src/database/s3.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async getSignedUrl(fileName: string, contentType: string, userId: string) {
    const fileKey = randomUUID().concat('-').concat(fileName);
    const signedUrl = await getSignedUrl(
      this.s3Service.s3Client,
      new PutObjectCommand({
        Bucket: 'paggo-case-bucket',
        Key: 'images/'.concat(fileKey),
        ContentType: contentType,
      }),
      { expiresIn: 600 },
    );

    await this.prisma.file.create({
      data: {
        userId,
        key: fileKey,
        name: fileName,
        contentType,
      },
    });

    return { signedUrl, key: fileKey, name: fileName };
  }
}
