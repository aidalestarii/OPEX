import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file-upload.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
