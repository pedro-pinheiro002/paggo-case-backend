import {
  AnalyzeExpenseCommand,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TextractService {
  private readonly textractClient = new TextractClient({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async analyzeDocument(objectKey: string) {
    const response = await this.textractClient.send(
      new AnalyzeExpenseCommand({
        Document: {
          S3Object: {
            Bucket: 'paggo-case-bucket',
            Name: objectKey,
          },
        },
      }),
    );

    return response;
  }
}
