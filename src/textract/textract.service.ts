import { PutObjectCommand } from '@aws-sdk/client-s3';
import {
  AnalyzeExpenseCommand,
  AnalyzeExpenseCommandOutput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { S3Service } from 'src/database/s3.service';

@Injectable()
export class TextractService {
  private readonly textractClient = new TextractClient({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  private convertToTextToS3(extractedText: AnalyzeExpenseCommandOutput) {
    let textToS3 = {
      table: {},
    };
    textToS3.table['header'] =
      extractedText.ExpenseDocuments[0].LineItemGroups[0].LineItems[0].LineItemExpenseFields.map(
        (field) => {
          if (field.Type.Text !== 'EXPENSE_ROW')
            return field.LabelDetection.Text;
        },
      );

    extractedText.ExpenseDocuments[0].LineItemGroups[0].LineItems.forEach(
      (lineItem, index) => {
        textToS3.table[`row${index}`] = lineItem.LineItemExpenseFields.map(
          (field) => {
            if (field.Type.Text !== 'EXPENSE_ROW')
              return field.ValueDetection.Text;
          },
        );
      },
    );
    return textToS3;
  }

  async analyzeDocument(objectKey: string, userId: string) {
    const extractedText = await this.textractClient.send(
      new AnalyzeExpenseCommand({
        Document: {
          S3Object: {
            Bucket: 'paggo-case-bucket',
            Name: 'images/'.concat(objectKey),
          },
        },
      }),
    );

    const extractedTextKey = objectKey.split('.')[0];
    const response = await this.s3Service.s3Client.send(
      new PutObjectCommand({
        Bucket: 'paggo-case-bucket',
        Key: 'texts/'.concat(extractedTextKey),
        Body: JSON.stringify(this.convertToTextToS3(extractedText)),
        ContentType: 'application/json',
      }),
    );

    await this.prisma.textExtracted.create({
      data: {
        userId,
        key: extractedTextKey,
      },
    })
    
    return response;
  }
}
