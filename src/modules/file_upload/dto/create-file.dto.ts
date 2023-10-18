import { FileUploadTypeEnum } from '@prisma/client';
import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  isNumber,
} from 'class-validator';

export class CreateFileDto {
  // @IsNotEmpty()
  uniqueId: string;

  filename: string;

  //@IsNumber()
  docSize: number;

  @IsNotEmpty()
  @IsString()
  docName: string;

  @IsNotEmpty()
  @IsEnum(FileUploadTypeEnum)
  docType: FileUploadTypeEnum;

  @IsNotEmpty()
  @IsString()
  departmentBy: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
