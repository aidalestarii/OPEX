import { ModulEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  tableName: string;
  // @IsNotEmpty()
  // files: Express.Multer.File;

  @IsNotEmpty()
  docName: string;

  @Type(() => Number)
  docCategoryId: number;

  docLink: string;

  docSize: number;

  docType: string;

  //@IsNotEmpty()
  @IsString()
  createdBy: string;

  static fromRequest(data: CreateFileDto): CreateFileDto {
    data.docCategoryId = Number(data.docCategoryId);

    return data;
  }
}

//FIX INI BISA JALAN
// export class CreateFileDto {
//   tableName: string;

//   @Type(() => Number)
//   docCategoryId: number;

//   docName: string;

//   docLink: string;

//   docSize: number;

//   docType: string;

//   //@IsNotEmpty()
//   @IsString()
//   createdBy: string;

//   static fromRequest(data: CreateFileDto): CreateFileDto {
//     data.docCategoryId = Number(data.docCategoryId);

//     return data;
//   }
// }

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
