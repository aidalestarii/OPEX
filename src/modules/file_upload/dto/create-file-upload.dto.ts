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

  @IsNotEmpty()
  @IsString()
  docName: string;

  @IsNotEmpty()
  @IsString()
  docLink: string;

  // @IsNotEmpty()
  // @IsNumber()
  docSize: number;

  @IsNotEmpty()
  @IsString()
  docType: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
