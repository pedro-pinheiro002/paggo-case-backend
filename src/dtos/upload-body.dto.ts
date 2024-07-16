import { IsNotEmpty } from 'class-validator';

export class UploadBody {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  contentType: string;
}
