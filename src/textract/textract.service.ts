import {
  AnalyzeExpenseCommand,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TextractService {
  private readonly textractClient = new TextractClient();

  constructor() {}

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
