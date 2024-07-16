import { Module } from "@nestjs/common";
import { TextractController } from "./textract.controller";
import { TextractService } from "./textract.service";

@Module({
    imports: [],
    controllers: [TextractController],
    providers: [TextractService],
})
export class TextractModule {}