import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file-upload.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsOptional()
  @IsString()
  tableName: string;

  @IsOptional()
  @IsNumber()
  idTable: number;

  @IsOptional()
  @IsNumber()
  idDocCategory: number;

  @IsOptional()
  @IsString()
  docName: string;

  @IsOptional()
  @IsString()
  docLink: string;

  @IsOptional()
  @IsNumber()
  docSize: number;

  @IsOptional()
  @IsString()
  docType: string;

  @IsOptional()
  @IsString()
  updatedBy: string;
}
