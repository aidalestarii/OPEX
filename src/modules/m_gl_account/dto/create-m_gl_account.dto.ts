import { Decimal } from '@prisma/client/runtime/library';
import { IsBoolean, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateMGlAccountDto {
  @IsNotEmpty()
  @IsNumber()
  glAccount: number;

  @IsNotEmpty()
  @IsString()
  groupGl: string;

  @IsNotEmpty()
  @IsString()
  groupDetail: string;

  @IsNotEmpty()
  @IsBoolean()
  sap: boolean;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
