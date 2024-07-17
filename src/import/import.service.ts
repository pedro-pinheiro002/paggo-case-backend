import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/database/s3.service';

@Injectable()
export class ImportService extends S3Service {
  constructor() {
    super(new ConfigService());
  }
  
  async importText(objectKey: string) {
    const response = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: 'paggo-case-bucket',
        Key: 'texts/'.concat(objectKey),
      }),
    );
    return response.Body.transformToString();
  }
}
