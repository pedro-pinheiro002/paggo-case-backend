import { Module } from "@nestjs/common";
import { TextractController } from "./textract.controller";
import { TextractService } from "./textract.service";
import { S3Service } from "src/database/s3.service";

@Module({
    imports: [],
    controllers: [TextractController],
    providers: [TextractService, S3Service],
})
export class TextractModule {}