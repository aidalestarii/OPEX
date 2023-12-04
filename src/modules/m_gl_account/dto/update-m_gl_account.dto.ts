import { PartialType } from '@nestjs/mapped-types';
import { CreateMGlAccountDto } from './create-m_gl_account.dto';
import { IsBoolean, IsString, IsOptional, IsNumber } from 'class-validator';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateMGlAccountDto extends PartialType(CreateMGlAccountDto) {
  @IsOptional()
  @IsNumber()
  glAccount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  groupDetail?: string;

  @IsOptional()
  @IsString()
  groupGl?: string;

  @IsOptional()
  @IsBoolean()
  sap?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  updatedBy: string;
}
