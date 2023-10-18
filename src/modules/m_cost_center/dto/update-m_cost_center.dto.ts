import { PartialType } from '@nestjs/mapped-types';
import { CreateMCostCenterDto } from './create-m_cost_center.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateMCostCenterDto extends PartialType(CreateMCostCenterDto) {
  @IsOptional()
  @IsString()
  costCenter: string;

  @IsOptional()
  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  bidang: string;

  @IsOptional()
  @IsString()
  dinas: string;

  @IsOptional()
  @IsString()
  groupDinas: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  profitCenter: string;

  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
