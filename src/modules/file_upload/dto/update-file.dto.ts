import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { FileUploadTypeEnum } from '@prisma/client';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsNotEmpty()
  @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsString()
  docName: string;

  docSize: number;

  @IsNotEmpty()
  @IsEnum(FileUploadTypeEnum)
  docType: FileUploadTypeEnum;

  @IsNotEmpty()
  @IsString()
  departmentBy: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
