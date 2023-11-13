import { Decimal } from '@prisma/client/runtime/library';
import { IsBoolean, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateMGlAccountDto {
  //gl_account, description, group_detail,
  //groupgl, sap, active, created by
  @IsNotEmpty()
  @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsNumber()
  glAccount: Decimal;

  @IsNotEmpty()
  @IsString()
  description: string;

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
