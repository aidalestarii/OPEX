import { PartialType } from '@nestjs/mapped-types';
import { CreateMGlAccountDto } from './create-m_gl_account.dto';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  isNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateMGlAccountDto extends PartialType(CreateMGlAccountDto) {
  @IsOptional()
  @IsString()
  uniqueId: string;

  @IsOptional()
  @IsString()
  group: string;

  @IsOptional()
  @IsString()
  groupDetail: string;

  @IsOptional()
  @IsNumber()
  glAccount: number;

  @IsOptional()
  @IsBoolean()
  sap: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
