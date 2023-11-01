import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFileDto {
  // @IsNotEmpty()
  // @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsString()
  tableName: string;

  // @IsNotEmpty()
  // @IsNumber()
  idTable: number;

  // @IsNotEmpty()
  // @IsNumber()
  idDocCategory: number;

  docName: string;

  docLink: string;

  // @IsNotEmpty()
  // @IsNumber()
  docSize: number;

  docType: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
