import { ModulEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  tableName: string;

  docCategoryId: number;

  tableId: number;

  docName: string;

  docLink: string;

  docSize: number;

  docType: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}

export class CreateMDocCategoryDto {
  @IsOptional()
  @IsEnum(ModulEnum)
  module: ModulEnum;

  @IsNotEmpty()
  @IsString()
  docCategory: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
