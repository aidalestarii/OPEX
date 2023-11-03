import { float } from '@elastic/elasticsearch/lib/api/types';
import { ModulEnum } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
  isDecimal,
  IsDecimal,
} from 'class-validator';

export class CreateFileDto {
  // @IsNotEmpty()
  // @IsString()
  // uniqueId: string;

  // @IsNotEmpty()
  // @IsString()
  // tableName: string;

  // // @IsNotEmpty()
  // // @IsNumber()
  // tableId: number;

  // // @IsNotEmpty()
  // // @IsNumber()
  // docCategoryId: number;

  // docName: string;

  // docLink: string;

  // // @IsNotEmpty()
  // // @IsNumber()
  // docSize: number;

  // docType: string;

  // @IsNotEmpty()
  // @IsString()
  // createdBy: string;

  // @IsNotEmpty()
  // @IsString()
  uniqueId: string;

  // @IsNotEmpty()
  // @IsString()
  tableName: string;
  docCategoryId: number;

  // @IsNotEmpty()
  // @IsNumber()
  tableId: number;

  //@IsNotEmpty()
  //@IsNumber()
  //docCategoryId: number;

  // @IsNotEmpty()
  // @IsString()
  docName: string;

  // @IsNotEmpty()
  // @IsString()
  docLink: string;

  // @IsNotEmpty()
  // @IsNumber()
  docSize: number;

  // @IsNotEmpty()
  // @IsString()
  docType: string;

  // @IsNotEmpty()
  // @IsString()
  createdBy: string;
}

export class CreateMDocCategoryDto {
  // @IsNotEmpty()
  // @IsNumber()
  //idDocCategory: number;

  // @IsNotEmpty()
  // @IsString()
  //uniqueId: string;

  //@IsNotEmpty()
  //@IsEnum(ModulEnum)
  module: ModulEnum;

  // @IsNotEmpty()
  // @IsString()
  docCategory: string;

  // @IsNotEmpty()
  // @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString()
  createdBy: string;

  // fileUpload: CreateFileDto[];
}
