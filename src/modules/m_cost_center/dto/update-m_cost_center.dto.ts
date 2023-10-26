import { PartialType } from '@nestjs/mapped-types';
import { CreateMCostCenterDto } from './create-m_cost_center.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateMCostCenterDto extends PartialType(CreateMCostCenterDto) {
  @IsOptional()
  @IsString()
  costCenter: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  bidang: string;

  @IsOptional()
  @IsString()
  dinas: string;

  @IsOptional()
  @IsString()
  directorat: string;

  @IsOptional()
  @IsString()
  groupDinas: string;

  @IsOptional()
  @IsString()
  profitCenter: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsDateString()
  updatedBy: string;
}
