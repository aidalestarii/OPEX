import { ModulEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  tableName: string;

  @IsNotEmpty()
  @IsString()
  docName: string;

  @IsNotEmpty()
  @Type(() => Number)
  docCategoryId: number;

  docLink: string;

  docSize: number;

  docType: string;

  files?: any;

  //@IsNotEmpty()
  // @IsString()
  createdBy: string;

  static fromRequest(data: CreateFileDto[]): CreateFileDto[] {
    return data.map((file) => {
      file.docCategoryId = Number(file.docCategoryId);
      return file;
    });
  }
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
