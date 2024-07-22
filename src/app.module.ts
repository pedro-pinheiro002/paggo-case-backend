import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { TextractModule } from './textract/textract.module';
import { ImportModule } from './import/import.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UploadModule,
    TextractModule,
    ImportModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
