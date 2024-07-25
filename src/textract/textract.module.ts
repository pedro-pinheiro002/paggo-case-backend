import { Module } from "@nestjs/common";
import { TextractController } from "./textract.controller";
import { TextractService } from "./textract.service";
import { S3Service } from "src/database/s3.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
    imports: [],
    controllers: [TextractController],
    providers: [TextractService, S3Service, PrismaService],
})
export class TextractModule {}